import type { TabKey } from './types/navigation';
import { ADMIN_MASTER_ROLE } from './constants/roles';

export interface RouteDefinition {
  path: string;
  allowedRoles: ReadonlyArray<string>;
}

export const authRoutes = {
  register: '/register',
} as const;

const managementRoles = [ADMIN_MASTER_ROLE, 'admin', 'manager'] as const;
const adminMasterOnlyRoles = [ADMIN_MASTER_ROLE] as const;
const publisherRoles = [...managementRoles, 'publisher'] as const;
const readOnlyRoles = [...publisherRoles, 'viewer'] as const;

export const routes: Record<TabKey, RouteDefinition> = {
  territories: { path: '/', allowedRoles: managementRoles },
  streets: { path: '/streets', allowedRoles: managementRoles },
  buildingsVillages: {
    path: '/buildings-villages',
    allowedRoles: managementRoles,
  },
  letters: { path: '/letters', allowedRoles: publisherRoles },
  exits: { path: '/exits', allowedRoles: managementRoles },
  assignments: { path: '/assignments', allowedRoles: managementRoles },
  users: { path: '/users', allowedRoles: adminMasterOnlyRoles },
  todayAssignments: { path: '/today', allowedRoles: readOnlyRoles },
  calendar: { path: '/calendar', allowedRoles: readOnlyRoles },
  suggestions: { path: '/suggestions', allowedRoles: managementRoles },
  notAtHome: { path: '/nao-em-casa', allowedRoles: publisherRoles },
  campaign: { path: '/campaign', allowedRoles: managementRoles },
};

export const routePaths = Object.fromEntries(
  Object.entries(routes).map(([key, config]) => [key, config.path]),
) as Record<TabKey, string>;

export const routeEntries = Object.entries(routes) as Array<
  [TabKey, RouteDefinition]
>;
