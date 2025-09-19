import { ADMIN_MASTER_ROLE } from './roles';

const getEnvVar = (key: string): string | undefined => {
  const metaEnv =
    typeof import.meta !== 'undefined' && (import.meta as { env?: Record<string, unknown> }).env;
  if (metaEnv) {
    const value = metaEnv[key];
    if (typeof value === 'string') {
      return value;
    }
  }

  const processEnv = (globalThis as { process?: { env?: Record<string, unknown> } }).process?.env;
  if (processEnv) {
    const value = processEnv[key];
    if (typeof value === 'string') {
      return value;
    }
  }

  return undefined;
};

export const ADMIN_MASTER_USERNAME = 'admin_master' as const;
export const ADMIN_MASTER_DEFAULT_NAME =
  getEnvVar('VITE_ADMIN_MASTER_NAME') ?? 'Administrador Master';
export const ADMIN_MASTER_DEFAULT_EMAIL =
  getEnvVar('VITE_ADMIN_MASTER_EMAIL') ?? 'admin_master@example.com';
export const ADMIN_MASTER_DEFAULT_PASSWORD =
  getEnvVar('VITE_ADMIN_MASTER_PASSWORD') ?? 'assigna123';
export const ADMIN_MASTER_DEFAULT_ROLE = ADMIN_MASTER_ROLE;
