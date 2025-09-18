import type { TabKey } from './types/navigation';

export const routePaths: Record<TabKey, string> = {
  territories: '/',
  streets: '/streets',
  buildingsVillages: '/buildings-villages',
  letters: '/letters',
  exits: '/exits',
  assignments: '/assignments',
  calendar: '/calendar',
  suggestions: '/suggestions',
  notAtHome: '/nao-em-casa'
};

export const routeEntries = Object.entries(routePaths) as Array<[
  TabKey,
  string
]>;
