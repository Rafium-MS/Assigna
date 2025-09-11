import React from 'react';
import { useMonthlyExportScheduler } from '../hooks/useMonthlyExportScheduler';
import { useTranslation } from 'react-i18next';

export const SchedulerControls: React.FC = () => {
  const { config, setConfig } = useMonthlyExportScheduler();
  const { t } = useTranslation();
  const dateValue = new Date(config.nextRun).toISOString().slice(0, 16);

  return (
    <div className="border rounded-xl p-4 mt-4">
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
        <span className="text-sm text-neutral-600 mr-2">{t('scheduler.nextRun')}</span>
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
