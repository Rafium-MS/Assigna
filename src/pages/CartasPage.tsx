import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  type BuildingVillage,
  type BuildingVillageLetterHistoryEntry,
  type BuildingVillageLetterStatus
} from '../types/building_village';
import type { Territorio } from '../types/territorio';
import { BuildingVillageRepository } from '../services/repositories/buildings_villages';
import { TerritorioRepository } from '../services/repositories/territorios';
import { useToast } from '../components/feedback/Toast';

const letterStatusTranslationKeys: Record<BuildingVillageLetterStatus, string> = {
  not_sent: 'buildingsVillages.letterStatus.notSent',
  in_progress: 'buildingsVillages.letterStatus.inProgress',
  sent: 'buildingsVillages.letterStatus.sent',
  responded: 'buildingsVillages.letterStatus.responded'
};

const formatDate = (value: string | null) => {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }
  return date.toLocaleDateString();
};

const sortLetterHistory = (
  history: BuildingVillageLetterHistoryEntry[]
): BuildingVillageLetterHistoryEntry[] => {
  return [...history].sort((a, b) => {
    const aDate = a.sent_at ?? '';
    const bDate = b.sent_at ?? '';
    return bDate.localeCompare(aDate);
  });
};

type ResponsibleGroupEntry = {
  buildingId: string;
  buildingName: string | null;
  territoryId: string;
  contactMethod: string | null;
  letterStatus: BuildingVillageLetterStatus | null;
  letterHistory: BuildingVillageLetterHistoryEntry[];
};

type ResponsibleGroup = {
  responsible: string;
  contactMethods: string[];
  lettersCount: number;
  entries: ResponsibleGroupEntry[];
};

const getLetterStatusLabel = (
  status: BuildingVillageLetterStatus | null | undefined,
  t: ReturnType<typeof useTranslation>['t']
) => {
  if (!status) {
    return t('buildingsVillages.letterStatus.unknown');
  }
  return t(letterStatusTranslationKeys[status]);
};

const CartasPage: React.FC = () => {
  const [villages, setVillages] = useState<BuildingVillage[]>([]);
  const [territories, setTerritories] = useState<Territorio[]>([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();
  const { t } = useTranslation();

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const [villagesData, territoriesData] = await Promise.all([
          BuildingVillageRepository.all(),
          TerritorioRepository.all()
        ]);
        setVillages(villagesData);
        setTerritories(territoriesData);
      } catch (error) {
        console.error(error);
        toast.error(t('letters.feedback.loadError'));
      } finally {
        setLoading(false);
      }
    };

    void load();
  }, [toast, t]);

  const territoryNameById = useMemo(() => {
    return territories.reduce<Record<string, string>>((acc, territory) => {
      acc[territory.id] = territory.nome;
      return acc;
    }, {});
  }, [territories]);

  const groups = useMemo<ResponsibleGroup[]>(() => {
    const map = new Map<string, ResponsibleGroup>();

    villages.forEach((building) => {
      const responsibleRaw = building.responsible?.trim();
      if (!responsibleRaw) {
        return;
      }

      const history = Array.isArray(building.letter_history) ? building.letter_history : [];
      const hasHistory = history.length > 0;
      const hasStatus = Boolean(building.letter_status);

      if (!hasHistory && !hasStatus) {
        return;
      }

      const group = map.get(responsibleRaw) ?? {
        responsible: responsibleRaw,
        contactMethods: [],
        lettersCount: 0,
        entries: []
      };

      group.entries.push({
        buildingId: building.id,
        buildingName: building.name ?? null,
        territoryId: building.territory_id,
        contactMethod: building.contact_method,
        letterStatus: building.letter_status ?? null,
        letterHistory: history
      });

      if (building.contact_method) {
        const method = building.contact_method.trim();
        if (method.length > 0 && !group.contactMethods.includes(method)) {
          group.contactMethods.push(method);
        }
      }

      group.lettersCount += history.length;

      map.set(responsibleRaw, group);
    });

    return Array.from(map.values())
      .map((group) => ({
        ...group,
        contactMethods: group.contactMethods.sort((a, b) => a.localeCompare(b)),
        entries: group.entries.sort((a, b) => {
          const nameA = a.buildingName ?? '';
          const nameB = b.buildingName ?? '';
          return nameA.localeCompare(nameB);
        })
      }))
      .sort((a, b) => a.responsible.localeCompare(b.responsible));
  }, [villages]);

  const totalLetters = useMemo(
    () => groups.reduce((sum, group) => sum + group.lettersCount, 0),
    [groups]
  );

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold">{t('letters.title')}</h1>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">{t('letters.subtitle')}</p>
      </header>

      <section className="rounded-2xl border border-black/5 bg-white/70 p-4 shadow backdrop-blur dark:border-white/10 dark:bg-neutral-900/60">
        <p className="text-sm text-neutral-600 dark:text-neutral-300">
          {t('letters.summary', { responsibles: groups.length, letters: totalLetters })}
        </p>
      </section>

      {loading ? (
        <div className="rounded-2xl border border-dashed border-black/10 p-8 text-center text-sm text-neutral-500 dark:border-white/10 dark:text-neutral-400">
          {t('letters.loading')}
        </div>
      ) : groups.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-black/10 p-8 text-center text-sm text-neutral-500 dark:border-white/10 dark:text-neutral-400">
          {t('letters.empty')}
        </div>
      ) : (
        <div className="space-y-6">
          {groups.map((group) => (
            <section
              key={group.responsible}
              className="space-y-3 rounded-2xl border border-black/5 bg-white/80 p-4 shadow-sm backdrop-blur dark:border-white/10 dark:bg-neutral-900/70"
            >
              <header className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
                    {group.responsible}
                  </h2>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    {t('letters.groupSummary', {
                      letters: group.lettersCount,
                      buildings: group.entries.length
                    })}
                  </p>
                </div>
                {group.contactMethods.length > 0 && (
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    {t('letters.contactMethods', {
                      methods: group.contactMethods.join(', ')
                    })}
                  </p>
                )}
              </header>

              <div className="space-y-3">
                {group.entries.map((entry) => (
                  <article
                    key={entry.buildingId}
                    className="space-y-2 rounded-xl border border-black/5 p-3 shadow-sm dark:border-white/10 dark:bg-neutral-950/50"
                  >
                    <header className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                      <div>
                        <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100">
                          {entry.buildingName || t('letters.unnamedBuilding')}
                        </h3>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400">
                          {territoryNameById[entry.territoryId] ?? t('letters.unknownTerritory')}
                        </p>
                      </div>
                      {entry.letterStatus && (
                        <span className="inline-flex items-center justify-center rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 dark:bg-blue-500/20 dark:text-blue-200">
                          {getLetterStatusLabel(entry.letterStatus, t)}
                        </span>
                      )}
                    </header>

                    <dl className="space-y-1 text-xs text-neutral-600 dark:text-neutral-300">
                      {entry.contactMethod && (
                        <div>
                          <dt className="font-medium text-neutral-500 dark:text-neutral-400">
                            {t('letters.contactMethod')}
                          </dt>
                          <dd>{entry.contactMethod}</dd>
                        </div>
                      )}
                      {entry.letterHistory.length === 0 ? (
                        <div>
                          <dt className="font-medium text-neutral-500 dark:text-neutral-400">
                            {t('letters.history')}
                          </dt>
                          <dd>{t('letters.noHistory')}</dd>
                        </div>
                      ) : (
                        <div>
                          <dt className="font-medium text-neutral-500 dark:text-neutral-400">
                            {t('letters.history')}
                          </dt>
                          <dd>
                            <ul className="space-y-1">
                              {sortLetterHistory(entry.letterHistory).map((letter) => {
                                const info = [
                                  letter.sent_at ? formatDate(letter.sent_at) : null,
                                  getLetterStatusLabel(letter.status, t)
                                ]
                                  .filter(Boolean)
                                  .join(' • ');
                                return (
                                  <li
                                    key={letter.id}
                                    className="rounded-lg bg-neutral-50 px-2 py-1 text-[11px] font-medium text-neutral-700 dark:bg-neutral-800/60 dark:text-neutral-200"
                                  >
                                    <span>{info}</span>
                                    {letter.notes && (
                                      <span className="block text-[11px] font-normal text-neutral-500 dark:text-neutral-400">
                                        {letter.notes}
                                      </span>
                                    )}
                                  </li>
                                );
                              })}
                            </ul>
                          </dd>
                        </div>
                      )}
                    </dl>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
};

export default CartasPage;
