import React, { useState } from 'react';
import { useConfirm } from '../components/feedback/ConfirmDialog';
import { useToast } from '../components/feedback/Toast';
import { StatusBadge } from '../components/feedback/Badge';
import { Card, Button, Input, Label } from '../components/ui';
import { useStoreContext } from '../store/localStore';
import type { Assignment } from '../types/assignment';
import { addDaysToIso, formatIsoDate, nextDateForWeekday } from '../utils/calendar';
import { findName } from '../utils/lookups';
import { getLastAssignmentDate } from '../utils/assignments';

const AssignmentsPage: React.FC = () => {
  const { territories, exits, assignments, addAssignment, delAssignment, updateAssignment, rules } = useStoreContext();
  const confirm = useConfirm();
  const toast = useToast();
  const todayIso = new Date().toISOString().slice(0, 10);
  const [territoryId, setTerritoryId] = useState('');
  const [exitId, setExitId] = useState('');
  const [startDate, setStartDate] = useState(todayIso);
  const [endDate, setEndDate] = useState(addDaysToIso(todayIso, rules.defaultDurationDays));

  const generateSuggestion = () => {
    const exit = exits.find((item) => item.id === exitId);
    if (!exit) {
      toast.error('Selecione uma saída');
      return;
    }

    const recent = new Set(
      [...assignments]
        .sort((a, b) => b.startDate.localeCompare(a.startDate))
        .slice(0, rules.avoidLastAssignments)
        .map((assignment) => assignment.territoryId),
    );

    const today = new Date(`${startDate}T00:00:00`);
    const candidates = territories
      .filter((territory) => !recent.has(territory.id))
      .flatMap((territory) => {
        const lastForExit = assignments
          .filter((assignment) => assignment.territoryId === territory.id && assignment.fieldExitId === exit.id)
          .map((assignment) => new Date(`${assignment.startDate}T00:00:00`))
          .sort((a, b) => b.getTime() - a.getTime())[0];

        if (lastForExit) {
          const months = (today.getTime() - lastForExit.getTime()) / 1000 / 60 / 60 / 24 / 30;
          if (months < rules.avoidMonthsPerExit) return [];
        }

        const lastOverall = getLastAssignmentDate(territory.id, assignments);
        const days = lastOverall ? Math.floor((today.getTime() - lastOverall.getTime()) / 86400000) : Number.POSITIVE_INFINITY;
        const recencyPenalty = lastOverall ? 1 / (days + 1) : 0;
        const score = -rules.recentWeight * recencyPenalty;
        return [{ territoryId: territory.id, score }];
      })
      .sort((a, b) => b.score - a.score);

    const chosen = candidates[0];
    if (!chosen) {
      toast.error('Sem territórios disponíveis');
      return;
    }

    const suggestionStart = nextDateForWeekday(startDate, exit.dayOfWeek);
    setTerritoryId(chosen.territoryId);
    setStartDate(suggestionStart);
    setEndDate(addDaysToIso(suggestionStart, rules.defaultDurationDays));
  };

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!territoryId || !exitId) {
      toast.error('Selecione território e saída');
      return;
    }
    addAssignment({ territoryId, fieldExitId: exitId, startDate, endDate });
  };

  const toggleAssignmentReturn = (assignment: Assignment) => {
    const { id, ...rest } = assignment;
    updateAssignment(id, { ...rest, returned: !assignment.returned });
  };

  return (
    <div className="grid gap-4">
      <Card title="Nova Designação">
        <form onSubmit={submit} className="grid md:grid-cols-5 gap-3">
          <div className="grid gap-1">
            <Label>Território</Label>
            <select
              value={territoryId}
              onChange={(event) => setTerritoryId(event.target.value)}
              className="w-full rounded-xl border px-3 py-2 bg-white dark:bg-neutral-900"
            >
              <option value="">Selecione…</option>
              {territories.map((territory) => (
                <option key={territory.id} value={territory.id}>
                  {territory.name}
                </option>
              ))}
            </select>
          </div>
          <div className="grid gap-1">
            <Label>Saída</Label>
            <select
              value={exitId}
              onChange={(event) => setExitId(event.target.value)}
              className="w-full rounded-xl border px-3 py-2 bg-white dark:bg-neutral-900"
            >
              <option value="">Selecione…</option>
              {exits.map((exit) => (
                <option key={exit.id} value={exit.id}>
                  {exit.name}
                </option>
              ))}
            </select>
          </div>
          <div className="grid gap-1">
            <Label>Data Designação</Label>
            <Input type="date" value={startDate} onChange={(event) => setStartDate(event.target.value)} />
          </div>
          <div className="grid gap-1">
            <Label>Data Devolução</Label>
            <Input type="date" value={endDate} onChange={(event) => setEndDate(event.target.value)} />
          </div>
          <div className="flex items-end justify-end gap-2">
            <Button type="button" onClick={generateSuggestion} className="bg-blue-600 text-white">
              Gerar sugestão
            </Button>
            <Button type="submit" className="bg-black text-white">
              Salvar
            </Button>
          </div>
        </form>
      </Card>

      <Card title={`Designações (${assignments.length})`}>
        {assignments.length === 0 ? (
          <p className="text-neutral-500">Sem designações.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-b">
                  <th className="py-2">Território</th>
                  <th>Saída</th>
                  <th>Designação</th>
                  <th>Devolução</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {assignments.map((assignment) => {
                  const status: 'devolvido' | 'atrasado' | 'ativo' = assignment.returned
                    ? 'devolvido'
                    : new Date(assignment.endDate) < new Date()
                      ? 'atrasado'
                      : 'ativo';
                  return (
                    <tr key={assignment.id} className="border-b last:border-0">
                      <td className="py-2">{findName(assignment.territoryId, territories)}</td>
                      <td>{findName(assignment.fieldExitId, exits)}</td>
                      <td>{formatIsoDate(assignment.startDate)}</td>
                      <td>{formatIsoDate(assignment.endDate)}</td>
                      <td>
                        <StatusBadge status={status} />
                      </td>
                      <td className="text-right flex gap-2 justify-end">
                        <Button onClick={() => toggleAssignmentReturn(assignment)} className="bg-neutral-100">
                          {assignment.returned ? 'Reativar' : 'Devolver'}
                        </Button>
                        <Button
                          onClick={async () => {
                            if (await confirm('Excluir designação?')) {
                              delAssignment(assignment.id);
                            }
                          }}
                          className="bg-red-50 text-red-700"
                        >
                          Excluir
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
};

export default AssignmentsPage;
