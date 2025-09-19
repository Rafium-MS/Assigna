import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '../components/ui';
import { useDesignacoes } from '../hooks/useDesignacoes';
import { useTerritorios } from '../hooks/useTerritorios';
import { useSaidas } from '../hooks/useSaidas';
import { formatIsoDate, todayLocalIso } from '../utils/calendar';
import { findName } from '../utils/lookups';

const TodayAssignmentsPage: React.FC = () => {
  const { t } = useTranslation();
  const { designacoes } = useDesignacoes();
  const { territorios } = useTerritorios();
  const { saidas } = useSaidas();

  const todayIso = useMemo(() => todayLocalIso(), []);

  const todaysAssignments = useMemo(() => {
    return designacoes
      .filter(
        (designacao) =>
          designacao.dataInicial <= todayIso &&
          designacao.dataFinal >= todayIso &&
          !designacao.devolvido,
      )
      .map((designacao) => ({
        designacao,
        territoryName: findName(designacao.territorioId, territorios),
        exitName: findName(designacao.saidaId, saidas),
      }))
      .sort((a, b) => a.territoryName.localeCompare(b.territoryName, undefined, { sensitivity: 'base' }));
  }, [designacoes, saidas, territorios, todayIso]);

  return (
    <div className="grid gap-4">
      <Card title={t('viewerAssignments.title')}>
        <div className="grid gap-4">
          <p className="text-sm text-neutral-600 dark:text-neutral-300">
            {t('viewerAssignments.currentDate', { date: formatIsoDate(todayIso) })}
          </p>

          {todaysAssignments.length === 0 ? (
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              {t('viewerAssignments.empty')}
            </p>
          ) : (
            <div className="grid gap-3">
              <p className="text-sm text-neutral-600 dark:text-neutral-300">
                {t('viewerAssignments.summary', { count: todaysAssignments.length })}
              </p>
              <ul className="grid gap-3">
                {todaysAssignments.map(({ designacao, territoryName, exitName }) => (
                  <li
                    key={designacao.id}
                    className="rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-4 py-3 shadow-sm"
                  >
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                      <div className="grid gap-1">
                        <span className="font-medium text-neutral-900 dark:text-neutral-100">{territoryName}</span>
                        <span className="text-sm text-neutral-600 dark:text-neutral-300">
                          {t('viewerAssignments.assignmentRange', {
                            start: formatIsoDate(designacao.dataInicial),
                            end: formatIsoDate(designacao.dataFinal),
                          })}
                        </span>
                      </div>
                      <div className="grid gap-1 text-sm text-neutral-600 dark:text-neutral-300 text-left sm:text-right">
                        {exitName !== '—' && (
                          <span>{t('viewerAssignments.exitLabel', { name: exitName })}</span>
                        )}
                        <span>{t('viewerAssignments.returnBy', { date: formatIsoDate(designacao.dataFinal) })}</span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default TodayAssignmentsPage;
