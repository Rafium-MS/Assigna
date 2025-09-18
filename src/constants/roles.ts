export const ADMIN_MASTER_ROLE = 'admin_master' as const;

export const AVAILABLE_ROLES = [
  ADMIN_MASTER_ROLE,
  'admin',
  'manager',
  'publisher',
  'viewer'
] as const;

export type UserRole = (typeof AVAILABLE_ROLES)[number];
