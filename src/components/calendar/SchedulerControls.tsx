import React from 'react';
import { useTranslation } from 'react-i18next';
import { useMonthlyExportScheduler } from '../../hooks/useMonthlyExportScheduler';
import { useAuth } from '../../hooks/useAuth';
import { formatLocalDateTimeForInput } from '../../utils/calendar';

/**
 * A component for controlling the monthly export scheduler.
 * It allows enabling/disabling the scheduler and setting the next run time.
 * @returns A JSX element representing the scheduler controls.
 */
export const SchedulerControls: React.FC = () => {
  const { currentUser } = useAuth();
  const { config, setConfig } = useMonthlyExportScheduler(currentUser?.id);
  const { t } = useTranslation();
  const dateValue = formatLocalDateTimeForInput(new Date(config.nextRun));

  return (
    <div className="border border-neutral-200 dark:border-neutral-700 rounded-xl p-4 mt-4 bg-white dark:bg-neutral-900">
      <h2 className="text-lg font-semibold mb-2">{t('scheduler.title')}</h2>
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={config.enabled}
          onChange={(e) => setConfig({ ...config, enabled: e.target.checked })}
        />
        <span>{t('scheduler.enable')}</span>
      </label>
      <div className="mt-2">
        <span className="text-sm text-neutral-600 dark:text-neutral-300 mr-2">
          {t('scheduler.nextRun')}
        </span>
        <input
          type="datetime-local"
          value={dateValue}
          onChange={(e) =>
            setConfig({ ...config, nextRun: new Date(e.target.value).getTime() })
          }
          className="rounded border px-2 py-1"
        />
      </div>
    </div>
  );
};
