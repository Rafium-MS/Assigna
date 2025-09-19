import React, { useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useToast } from '../components/feedback/Toast';
import { GuidedTour, GuidedTourStep } from '../components/feedback/GuidedTour';
import { Card, Button, Input, Label } from '../components/ui';
import { useTerritorios } from '../hooks/useTerritorios';
import { useSaidas } from '../hooks/useSaidas';
import { useDesignacoes } from '../hooks/useDesignacoes';
import { useSuggestionRules } from '../hooks/useSuggestionRules';
import { addDaysToIso, formatIsoDate, nextDateForWeekday, todayLocalIso } from '../utils/calendar';
import { findName } from '../utils/lookups';
import { getLastAssignmentDate } from '../utils/assignments';

interface Suggestion {
  saidaId: string;
  territorioId: string;
  dataInicial: string;
  dataFinal: string;
}

const SuggestionsPage: React.FC = () => {
  const { territorios } = useTerritorios();
  const { saidas } = useSaidas();
  const { designacoes, addDesignacao } = useDesignacoes();
  const [rules, setRules] = useSuggestionRules();
  const toast = useToast();
  const { t } = useTranslation();
  const [startDate, setStartDate] = useState<string>(() => todayLocalIso());
  const [duration, setDuration] = useState<number>(rules.defaultDurationDays);
  const [avoidCount, setAvoidCount] = useState<number>(rules.avoidLastAssignments);
  const [monthsPerExit, setMonthsPerExit] = useState<number>(rules.avoidMonthsPerExit);
  const [recentWeight, setRecentWeight] = useState<number>(rules.recentWeight);
  const [balanceWeight, setBalanceWeight] = useState<number>(rules.balanceWeight);
  const [generated, setGenerated] = useState<Suggestion[] | null>(null);
  const [rankings, setRankings] = useState<Record<string, { territorioId: string; score: number; reasons: string[] }[]>>({});
  const [tourStep, setTourStep] = useState<number | null>(null);

  const startDateRef = useRef<HTMLDivElement>(null);
  const durationRef = useRef<HTMLDivElement>(null);
  const avoidCountRef = useRef<HTMLDivElement>(null);
  const monthsPerExitRef = useRef<HTMLDivElement>(null);
  const recentWeightRef = useRef<HTMLDivElement>(null);
  const balanceWeightRef = useRef<HTMLDivElement>(null);

  const tourSteps: GuidedTourStep[] = useMemo(
    () => [
      {
        ref: startDateRef,
        title: t('suggestions.labels.startDate'),
        description: t('suggestions.tooltips.startDate'),
      },
      {
        ref: durationRef,
        title: t('suggestions.labels.duration'),
        description: t('suggestions.tooltips.duration'),
      },
      {
        ref: avoidCountRef,
        title: t('suggestions.labels.avoidCount'),
        description: t('suggestions.tooltips.avoidCount'),
      },
      {
        ref: monthsPerExitRef,
        title: t('suggestions.labels.monthsPerExit'),
        description: t('suggestions.tooltips.monthsPerExit'),
      },
      {
        ref: recentWeightRef,
        title: t('suggestions.labels.recentWeight'),
        description: t('suggestions.tooltips.recentWeight'),
      },
      {
        ref: balanceWeightRef,
        title: t('suggestions.labels.balanceWeight'),
        description: t('suggestions.tooltips.balanceWeight'),
      },
    ],
    [t],
  );

  const isTourOpen = tourStep !== null;

  const openTour = () => setTourStep(0);
  const closeTour = () => setTourStep(null);
  const handleTourNext = () =>
    setTourStep((prev) => {
      if (prev === null) return prev;
      if (prev >= tourSteps.length - 1) return null;
      return prev + 1;
    });
  const handleTourPrevious = () =>
    setTourStep((prev) => {
      if (prev === null || prev <= 0) return prev;
      return prev - 1;
    });

  const generate = () => {
    if (territorios.length === 0 || saidas.length === 0) {
      setGenerated([]);
      setRankings({});
      return;
    }

    const suggestions: Suggestion[] = [];
    const rankingMap: Record<string, { territorioId: string; score: number; reasons: string[] }[]> = {};
    const recent = new Set(
      [...designacoes]
        .sort((a, b) => b.dataInicial.localeCompare(a.dataInicial))
        .slice(0, avoidCount)
        .map((designacao) => designacao.territorioId),
    );
    const used = new Set<string>();
    const exitCounts = saidas.map((saida) => ({
      id: saida.id,
      count: designacoes.filter((designacao) => designacao.saidaId === saida.id).length,
    }));
    const maxCount = Math.max(1, ...exitCounts.map((item) => item.count));
    const orderedSaidas = [...saidas].sort((a, b) => {
      const countA = exitCounts.find((item) => item.id === a.id)?.count || 0;
      const countB = exitCounts.find((item) => item.id === b.id)?.count || 0;
      return countA - countB;
    });

    orderedSaidas.forEach((saida) => {
      const exitCount = exitCounts.find((item) => item.id === saida.id)?.count || 0;
      const exitBalance = (maxCount - exitCount) / maxCount;
      const today = new Date(`${startDate}T00:00:00`);
      const candidates = territorios
        .filter((territorio) => !recent.has(territorio.id) && !used.has(territorio.id))
        .flatMap((territorio) => {
          const lastForExit = designacoes
            .filter((designacao) => designacao.territorioId === territorio.id && designacao.saidaId === saida.id)
            .map((designacao) => new Date(`${designacao.dataInicial}T00:00:00`))
            .sort((a, b) => b.getTime() - a.getTime())[0];
          if (lastForExit) {
            const months = (today.getTime() - lastForExit.getTime()) / 1000 / 60 / 60 / 24 / 30;
            if (months < monthsPerExit) return [];
          }
          const lastOverall = getLastAssignmentDate(territorio.id, designacoes);
          const days = lastOverall ? Math.floor((today.getTime() - lastOverall.getTime()) / 86400000) : Number.POSITIVE_INFINITY;
          const recencyPenalty = lastOverall ? 1 / (days + 1) : 0;
          const score = balanceWeight * exitBalance - recentWeight * recencyPenalty;
          const reasons = [
            t('suggestions.reasons.exitLoad', { value: (exitBalance * 100).toFixed(0) }),
            lastOverall
              ? t('suggestions.reasons.recent', { value: (recencyPenalty * 100).toFixed(0) })
              : t('suggestions.reasons.neverUsed'),
          ];
          return [{ territorioId: territorio.id, score, reasons }];
        })
        .sort((a, b) => b.score - a.score);
      rankingMap[saida.id] = candidates;
      const chosen = candidates[0];
      if (chosen) {
        used.add(chosen.territorioId);
        const suggestionStart = nextDateForWeekday(startDate, saida.diaDaSemana);
        suggestions.push({
          saidaId: saida.id,
          territorioId: chosen.territorioId,
          dataInicial: suggestionStart,
          dataFinal: addDaysToIso(suggestionStart, duration),
        });
      }
    });

    setRankings(rankingMap);
    setGenerated(suggestions);
  };

  const applyAll = () => {
    if (!generated || generated.length === 0) {
      toast.error(t('suggestions.toast.nothingToApply'));
      return;
    }
    generated.forEach((suggestion) =>
      void addDesignacao({
        territorioId: suggestion.territorioId,
        saidaId: suggestion.saidaId,
        dataInicial: suggestion.dataInicial,
        dataFinal: suggestion.dataFinal,
        devolvido: false,
      }),
    );
    toast.success(t('suggestions.toast.applied'));
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
        title={t('suggestions.cards.rules')}
        actions={
          <>
            <Button onClick={openTour} className="bg-blue-600 text-white">
              {t('suggestions.actions.viewTour')}
            </Button>
            <Button
              onClick={saveRuleDefaults}
              className="bg-neutral-100 text-neutral-900 hover:bg-neutral-200 border-neutral-200 dark:bg-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-700 dark:border-neutral-700"
            >
              {t('suggestions.actions.saveDefaults')}
            </Button>
          </>
        }
      >
        <div className="grid md:grid-cols-6 gap-3">
          <div ref={startDateRef} className="grid gap-1">
            <Label htmlFor="suggestion-rule-startDate" title={t('suggestions.tooltips.startDate')}>
              {t('suggestions.labels.startDate')}
            </Label>
            <Input
              id="suggestion-rule-startDate"
              type="date"
              value={startDate}
              onChange={(event) => setStartDate(event.target.value)}
            />
          </div>
          <div ref={durationRef} className="grid gap-1">
            <Label htmlFor="suggestion-rule-duration" title={t('suggestions.tooltips.duration')}>
              {t('suggestions.labels.duration')}
            </Label>
            <Input
              id="suggestion-rule-duration"
              type="number"
              min={1}
              value={duration}
              onChange={(event) => setDuration(Number(event.target.value) || 1)}
            />
          </div>
          <div ref={avoidCountRef} className="grid gap-1">
            <Label htmlFor="suggestion-rule-avoidCount" title={t('suggestions.tooltips.avoidCount')}>
              {t('suggestions.labels.avoidCount')}
            </Label>
            <Input
              id="suggestion-rule-avoidCount"
              type="number"
              min={0}
              value={avoidCount}
              onChange={(event) => setAvoidCount(Number(event.target.value) || 0)}
            />
          </div>
          <div ref={monthsPerExitRef} className="grid gap-1">
            <Label htmlFor="suggestion-rule-monthsPerExit" title={t('suggestions.tooltips.monthsPerExit')}>
              {t('suggestions.labels.monthsPerExit')}
            </Label>
            <Input
              id="suggestion-rule-monthsPerExit"
              type="number"
              min={0}
              value={monthsPerExit}
              onChange={(event) => setMonthsPerExit(Number(event.target.value) || 0)}
            />
          </div>
          <div ref={recentWeightRef} className="grid gap-1">
            <Label htmlFor="suggestion-rule-recentWeight" title={t('suggestions.tooltips.recentWeight')}>
              {t('suggestions.labels.recentWeight')}
            </Label>
            <Input
              id="suggestion-rule-recentWeight"
              type="number"
              min={0}
              step="0.1"
              value={recentWeight}
              onChange={(event) => setRecentWeight(Number(event.target.value) || 0)}
            />
          </div>
          <div ref={balanceWeightRef} className="grid gap-1">
            <Label htmlFor="suggestion-rule-balanceWeight" title={t('suggestions.tooltips.balanceWeight')}>
              {t('suggestions.labels.balanceWeight')}
            </Label>
            <Input
              id="suggestion-rule-balanceWeight"
              type="number"
              min={0}
              step="0.1"
              value={balanceWeight}
              onChange={(event) => setBalanceWeight(Number(event.target.value) || 0)}
            />
          </div>
          <div className="flex items-end">
            <Button onClick={generate} className="bg-black text-white w-full">
              {t('suggestions.actions.generate')}
            </Button>
          </div>
        </div>
      </Card>

      <GuidedTour
        steps={tourSteps}
        open={isTourOpen}
        stepIndex={tourStep ?? 0}
        onClose={closeTour}
        onNext={handleTourNext}
        onPrevious={handleTourPrevious}
      />

      <Card
        title={t('suggestions.cards.generated')}
        actions={
          generated && generated.length > 0 && (
            <Button onClick={applyAll} className="bg-green-600 text-white">
              {t('suggestions.actions.applyAll')}
            </Button>
          )
        }
      >
        {generated === null ? (
          <p className="text-neutral-500">{t('suggestions.messages.waiting')}</p>
        ) : generated.length === 0 ? (
          <p className="text-neutral-500">{t('suggestions.messages.empty')}</p>
        ) : (
          <div className="grid gap-4">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left border-b">
                    <th className="py-2">{t('suggestions.table.exit')}</th>
                    <th>{t('suggestions.table.territory')}</th>
                    <th>{t('suggestions.table.start')}</th>
                    <th>{t('suggestions.table.end')}</th>
                  </tr>
                </thead>
                <tbody>
                  {generated.map((suggestion, index) => (
                    <tr key={suggestion.saidaId + suggestion.territorioId + index} className="border-b last:border-0">
                      <td className="py-2">{findName(suggestion.saidaId, saidas)}</td>
                      <td>{findName(suggestion.territorioId, territorios)}</td>
                      <td>{formatIsoDate(suggestion.dataInicial)}</td>
                      <td>{formatIsoDate(suggestion.dataFinal)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {Object.entries(rankings).map(([saidaId, list]) => (
                <div key={saidaId} className="border rounded-xl p-3">
                  <h4 className="font-semibold mb-2">{findName(saidaId, saidas)}</h4>
                  <ol className="list-decimal ml-4 space-y-1 text-sm">
                    {list.map((ranking) => (
                      <li key={ranking.territorioId}>
                        {findName(ranking.territorioId, territorios)} - {ranking.score.toFixed(2)}
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
