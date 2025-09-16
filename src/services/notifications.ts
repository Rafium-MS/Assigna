const NOTIFICATION_ENDPOINT = '/notify';

const normalizeBaseUrl = (baseUrl: string): string => {
  return baseUrl.replace(/\/+$/, '');
};

const getNotificationsApiUrl = (): string | null => {
  const configured = import.meta.env.VITE_NOTIFICATIONS_API_URL;
  const trimmed = configured?.trim();
  if (!trimmed) {
    return null;
  }
  return `${normalizeBaseUrl(trimmed)}${NOTIFICATION_ENDPOINT}`;
};

export interface NotifyTerritoryReturnPayload {
  endpoint: string;
  territoryName: string;
}

const buildNotificationBody = (payload: NotifyTerritoryReturnPayload): Record<string, string> => ({
  endpoint: payload.endpoint,
  title: 'Território devolvido',
  body: `${payload.territoryName} foi devolvido`,
});

export const notifyTerritoryReturn = async (
  payload: NotifyTerritoryReturnPayload,
): Promise<boolean> => {
  const url = getNotificationsApiUrl();
  if (!url) {
    return false;
  }

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(buildNotificationBody(payload)),
  });

  if (!response.ok) {
    throw new Error(`Failed to notify territory return: ${response.status} ${response.statusText}`);
  }

  return true;
};
