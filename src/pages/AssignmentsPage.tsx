import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useConfirm } from '../components/feedback/ConfirmDialog';
import { useToast } from '../components/feedback/Toast';
import { StatusBadge } from '../components/feedback/Badge';
import { Card, Button, Input, Label } from '../components/ui';
import { useTerritorios } from '../hooks/useTerritorios';
import { useSaidas } from '../hooks/useSaidas';
import { useDesignacoes } from '../hooks/useDesignacoes';
import { useSuggestionRules } from '../hooks/useSuggestionRules';
import type { Designacao } from '../types/designacao';
import { addDaysToIso, formatIsoDate, nextDateForWeekday } from '../utils/calendar';
import { findName } from '../utils/lookups';
import { getLastAssignmentDate } from '../utils/assignments';

const AssignmentsPage: React.FC = () => {
  const { territorios } = useTerritorios();
  const { saidas } = useSaidas();
  const { designacoes, addDesignacao, removeDesignacao, updateDesignacao } = useDesignacoes();
  const [rules] = useSuggestionRules();
  const confirm = useConfirm();
  const toast = useToast();
  const { t } = useTranslation();
  const todayIso = new Date().toISOString().slice(0, 10);
  const [territorioId, setTerritorioId] = useState('');
  const [saidaId, setSaidaId] = useState('');
  const [startDate, setStartDate] = useState(todayIso);
  const [endDate, setEndDate] = useState(addDaysToIso(todayIso, rules.defaultDurationDays));

  const generateSuggestion = () => {
    const saida = saidas.find((item) => item.id === saidaId);
    if (!saida) {
      toast.error(t('assignments.selectExit'));
      return;
    }

    const recent = new Set(
      [...designacoes]
        .sort((a, b) => b.dataInicial.localeCompare(a.dataInicial))
        .slice(0, rules.avoidLastAssignments)
        .map((designacao) => designacao.territorioId),
    );

    const today = new Date(`${startDate}T00:00:00`);
    const candidates = territorios
      .filter((territorio) => !recent.has(territorio.id))
      .flatMap((territorio) => {
        const lastForExit = designacoes
          .filter((designacao) => designacao.territorioId === territorio.id && designacao.saidaId === saida.id)
          .map((designacao) => new Date(`${designacao.dataInicial}T00:00:00`))
          .sort((a, b) => b.getTime() - a.getTime())[0];

        if (lastForExit) {
          const months = (today.getTime() - lastForExit.getTime()) / 1000 / 60 / 60 / 24 / 30;
          if (months < rules.avoidMonthsPerExit) return [];
        }

        const lastOverall = getLastAssignmentDate(territorio.id, designacoes);
        const days = lastOverall ? Math.floor((today.getTime() - lastOverall.getTime()) / 86400000) : Number.POSITIVE_INFINITY;
        const recencyPenalty = lastOverall ? 1 / (days + 1) : 0;
        const score = -rules.recentWeight * recencyPenalty;
        return [{ territorioId: territorio.id, score }];
      })
      .sort((a, b) => b.score - a.score);

    const chosen = candidates[0];
    if (!chosen) {
      toast.error(t('assignments.noAvailableTerritories'));
      return;
    }

    const suggestionStart = nextDateForWeekday(startDate, saida.diaDaSemana);
    setTerritorioId(chosen.territorioId);
    setStartDate(suggestionStart);
    setEndDate(addDaysToIso(suggestionStart, rules.defaultDurationDays));
  };

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!territorioId || !saidaId) {
      toast.error(t('assignments.selectTerritoryAndExit'));
      return;
    }
    await addDesignacao({ territorioId, saidaId, dataInicial: startDate, dataFinal: endDate, devolvido: false });
  };

  const toggleDesignacaoReturn = async (designacao: Designacao) => {
    await updateDesignacao(designacao.id, { devolvido: !designacao.devolvido });
  };

  return (
    <div className="grid gap-4">
      <Card title={t('assignments.newAssignment')}>
        <form onSubmit={submit} className="grid md:grid-cols-5 gap-3">
          <div className="grid gap-1">
            <Label>{t('assignments.territory')}</Label>
            <select
              value={territorioId}
              onChange={(event) => setTerritorioId(event.target.value)}
              className="w-full rounded-xl border px-3 py-2 bg-white dark:bg-neutral-900"
            >
              <option value="">{t('assignments.selectPlaceholder')}</option>
              {territorios.map((territorio) => (
                <option key={territorio.id} value={territorio.id}>
                  {territorio.nome}
                </option>
              ))}
            </select>
          </div>
          <div className="grid gap-1">
            <Label>{t('assignments.exit')}</Label>
            <select
              value={saidaId}
              onChange={(event) => setSaidaId(event.target.value)}
              className="w-full rounded-xl border px-3 py-2 bg-white dark:bg-neutral-900"
            >
              <option value="">{t('assignments.selectPlaceholder')}</option>
              {saidas.map((saida) => (
                <option key={saida.id} value={saida.id}>
                  {saida.nome}
                </option>
              ))}
            </select>
          </div>
          <div className="grid gap-1">
            <Label>{t('assignments.assignmentDate')}</Label>
            <Input type="date" value={startDate} onChange={(event) => setStartDate(event.target.value)} />
          </div>
          <div className="grid gap-1">
            <Label>{t('assignments.returnDate')}</Label>
            <Input type="date" value={endDate} onChange={(event) => setEndDate(event.target.value)} />
          </div>
          <div className="flex items-end justify-end gap-2">
            <Button type="button" onClick={generateSuggestion} className="bg-blue-600 text-white">
              {t('assignments.generateSuggestion')}
            </Button>
            <Button type="submit" className="bg-black text-white">
              {t('assignments.save')}
            </Button>
          </div>
        </form>
      </Card>

      <Card title={t('assignments.assignmentsWithCount', { count: designacoes.length })}>
        {designacoes.length === 0 ? (
          <p className="text-neutral-500">{t('assignments.noAssignments')}</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-b">
                  <th className="py-2">{t('assignments.territory')}</th>
                  <th>{t('assignments.exit')}</th>
                  <th>{t('assignments.assignmentDate')}</th>
                  <th>{t('assignments.returnDate')}</th>
                  <th>{t('assignments.status')}</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {designacoes.map((designacao) => {
                  const status: 'devolvido' | 'atrasado' | 'ativo' = designacao.devolvido
                    ? 'devolvido'
                    : new Date(designacao.dataFinal) < new Date()
                      ? 'atrasado'
                      : 'ativo';
                  return (
                    <tr key={designacao.id} className="border-b last:border-0">
                      <td className="py-2">{findName(designacao.territorioId, territorios)}</td>
                      <td>{findName(designacao.saidaId, saidas)}</td>
                      <td>{formatIsoDate(designacao.dataInicial)}</td>
                      <td>{formatIsoDate(designacao.dataFinal)}</td>
                      <td>
                        <StatusBadge status={status} />
                      </td>
                      <td className="text-right flex gap-2 justify-end">
                        <Button onClick={() => toggleDesignacaoReturn(designacao)} className="bg-neutral-100">
                          {designacao.devolvido ? t('assignments.reactivate') : t('assignments.markAsReturned')}
                        </Button>
                        <Button
                          onClick={async () => {
                            if (await confirm(t('assignments.confirmDelete'))) {
                              await removeDesignacao(designacao.id);
                            }
                          }}
                          className="bg-red-50 text-red-700"
                        >
                          {t('assignments.delete')}
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
