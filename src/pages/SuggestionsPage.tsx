import React, { useState } from 'react';
import { useToast } from '../components/feedback/Toast';
import { Card, Button, Input, Label } from '../components/ui';
import { useStoreContext } from '../store/localStore';
import { addDaysToIso, formatIsoDate, nextDateForWeekday } from '../utils/calendar';
import { findName } from '../utils/lookups';
import { getLastAssignmentDate } from '../utils/assignments';

interface Suggestion {
  fieldExitId: string;
  territoryId: string;
  startDate: string;
  endDate: string;
}

const SuggestionsPage: React.FC = () => {
  const { territories, exits, assignments, rules, setRules, addAssignment } = useStoreContext();
  const toast = useToast();
  const [startDate, setStartDate] = useState<string>(() => new Date().toISOString().slice(0, 10));
  const [duration, setDuration] = useState<number>(rules.defaultDurationDays);
  const [avoidCount, setAvoidCount] = useState<number>(rules.avoidLastAssignments);
  const [monthsPerExit, setMonthsPerExit] = useState<number>(rules.avoidMonthsPerExit);
  const [recentWeight, setRecentWeight] = useState<number>(rules.recentWeight);
  const [balanceWeight, setBalanceWeight] = useState<number>(rules.balanceWeight);
  const [generated, setGenerated] = useState<Suggestion[] | null>(null);
  const [rankings, setRankings] = useState<Record<string, { territoryId: string; score: number; reasons: string[] }[]>>({});

  const generate = () => {
    if (territories.length === 0 || exits.length === 0) {
      setGenerated([]);
      setRankings({});
      return;
    }

    const suggestions: Suggestion[] = [];
    const rankingMap: Record<string, { territoryId: string; score: number; reasons: string[] }[]> = {};
    const recent = new Set(
      [...assignments]
        .sort((a, b) => b.startDate.localeCompare(a.startDate))
        .slice(0, avoidCount)
        .map((assignment) => assignment.territoryId),
    );
    const used = new Set<string>();
    const exitCounts = exits.map((exit) => ({ id: exit.id, count: assignments.filter((assignment) => assignment.fieldExitId === exit.id).length }));
    const maxCount = Math.max(1, ...exitCounts.map((item) => item.count));
    const orderedExits = [...exits].sort((a, b) => {
      const countA = exitCounts.find((item) => item.id === a.id)?.count || 0;
      const countB = exitCounts.find((item) => item.id === b.id)?.count || 0;
      return countA - countB;
    });

    orderedExits.forEach((exit) => {
      const exitCount = exitCounts.find((item) => item.id === exit.id)?.count || 0;
      const exitBalance = (maxCount - exitCount) / maxCount;
      const today = new Date(`${startDate}T00:00:00`);
      const candidates = territories
        .filter((territory) => !recent.has(territory.id) && !used.has(territory.id))
        .flatMap((territory) => {
          const lastForExit = assignments
            .filter((assignment) => assignment.territoryId === territory.id && assignment.fieldExitId === exit.id)
            .map((assignment) => new Date(`${assignment.startDate}T00:00:00`))
            .sort((a, b) => b.getTime() - a.getTime())[0];
          if (lastForExit) {
            const months = (today.getTime() - lastForExit.getTime()) / 1000 / 60 / 60 / 24 / 30;
            if (months < monthsPerExit) return [];
          }
          const lastOverall = getLastAssignmentDate(territory.id, assignments);
          const days = lastOverall ? Math.floor((today.getTime() - lastOverall.getTime()) / 86400000) : Number.POSITIVE_INFINITY;
          const recencyPenalty = lastOverall ? 1 / (days + 1) : 0;
          const score = balanceWeight * exitBalance - recentWeight * recencyPenalty;
          const reasons = [
            `Carga saída ${(exitBalance * 100).toFixed(0)}%`,
            lastOverall ? `Recente ${(recencyPenalty * 100).toFixed(0)}%` : 'Nunca usado',
          ];
          return [{ territoryId: territory.id, score, reasons }];
        })
        .sort((a, b) => b.score - a.score);
      rankingMap[exit.id] = candidates;
      const chosen = candidates[0];
      if (chosen) {
        used.add(chosen.territoryId);
        const suggestionStart = nextDateForWeekday(startDate, exit.dayOfWeek);
        suggestions.push({
          fieldExitId: exit.id,
          territoryId: chosen.territoryId,
          startDate: suggestionStart,
          endDate: addDaysToIso(suggestionStart, duration),
        });
      }
    });

    setRankings(rankingMap);
    setGenerated(suggestions);
  };

  const applyAll = () => {
    if (!generated || generated.length === 0) {
      toast.error('Nada para aplicar');
      return;
    }
    generated.forEach((suggestion) =>
      addAssignment({
        territoryId: suggestion.territoryId,
        fieldExitId: suggestion.fieldExitId,
        startDate: suggestion.startDate,
        endDate: suggestion.endDate,
      }),
    );
    toast.success('Designações aplicadas');
  };

  const saveRuleDefaults = () =>
    setRules({
      avoidLastAssignments: avoidCount,
      defaultDurationDays: duration,
      avoidMonthsPerExit: monthsPerExit,
      recentWeight,
      balanceWeight,
    });

  return (
    <div className="grid gap-4">
      <Card
        title="Regras de Sugestão"
        actions={
          <Button onClick={saveRuleDefaults} className="bg-neutral-100">
            Salvar padrões
          </Button>
        }
      >
        <div className="grid md:grid-cols-6 gap-3">
          <div className="grid gap-1">
            <Label title="Data inicial para geração das sugestões">Data inicial</Label>
            <Input type="date" value={startDate} onChange={(event) => setStartDate(event.target.value)} />
          </div>
          <div className="grid gap-1">
            <Label title="Duração padrão das designações em dias">Duração (dias)</Label>
            <Input type="number" min={1} value={duration} onChange={(event) => setDuration(Number(event.target.value) || 1)} />
          </div>
          <div className="grid gap-1">
            <Label title="Número de últimas designações consideradas para evitar repetição">Evitar repetição (últimas N)</Label>
            <Input type="number" min={0} value={avoidCount} onChange={(event) => setAvoidCount(Number(event.target.value) || 0)} />
          </div>
          <div className="grid gap-1">
            <Label title="Tempo mínimo em meses antes de repetir o mesmo território na mesma saída">Repetição por saída (meses)</Label>
            <Input type="number" min={0} value={monthsPerExit} onChange={(event) => setMonthsPerExit(Number(event.target.value) || 0)} />
          </div>
          <div className="grid gap-1">
            <Label title="Quanto maior, mais penaliza territórios usados recentemente">Peso recência</Label>
            <Input type="number" min={0} step="0.1" value={recentWeight} onChange={(event) => setRecentWeight(Number(event.target.value) || 0)} />
          </div>
          <div className="grid gap-1">
            <Label title="Quanto maior, mais equilibrada a carga entre saídas">Peso carga saída</Label>
            <Input type="number" min={0} step="0.1" value={balanceWeight} onChange={(event) => setBalanceWeight(Number(event.target.value) || 0)} />
          </div>
          <div className="flex items-end">
            <Button onClick={generate} className="bg-black text-white w-full">
              Gerar Sugestões
            </Button>
          </div>
        </div>
      </Card>

      <Card
        title="Sugestões Geradas"
        actions={
          generated && generated.length > 0 && (
            <Button onClick={applyAll} className="bg-green-600 text-white">
              Aplicar Tudo
            </Button>
          )
        }
      >
        {generated === null ? (
          <p className="text-neutral-500">Aguardando geração…</p>
        ) : generated.length === 0 ? (
          <p className="text-neutral-500">Sem sugestões (verifique se há territórios e saídas).</p>
        ) : (
          <div className="grid gap-4">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left border-b">
                    <th className="py-2">Saída</th>
                    <th>Território</th>
                    <th>Designação</th>
                    <th>Devolução</th>
                  </tr>
                </thead>
                <tbody>
                  {generated.map((suggestion, index) => (
                    <tr key={suggestion.fieldExitId + suggestion.territoryId + index} className="border-b last:border-0">
                      <td className="py-2">{findName(suggestion.fieldExitId, exits)}</td>
                      <td>{findName(suggestion.territoryId, territories)}</td>
                      <td>{formatIsoDate(suggestion.startDate)}</td>
                      <td>{formatIsoDate(suggestion.endDate)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {Object.entries(rankings).map(([exitId, list]) => (
                <div key={exitId} className="border rounded-xl p-3">
                  <h4 className="font-semibold mb-2">{findName(exitId, exits)}</h4>
                  <ol className="list-decimal ml-4 space-y-1 text-sm">
                    {list.map((ranking) => (
                      <li key={ranking.territoryId}>
                        {findName(ranking.territoryId, territories)} - {ranking.score.toFixed(2)}
                        <span className="block text-neutral-500">{ranking.reasons.join(' | ')}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              ))}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default SuggestionsPage;
