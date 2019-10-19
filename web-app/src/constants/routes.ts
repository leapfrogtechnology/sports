export const BASE_ROUTE = '/';

export const TOURNAMENT = '/:game/:season';

export const SUB_ROUTES = {
  HOME: { path: '', name: 'HOME', sortOrder: 1 },
  RESULTS: { path: 'results', name: 'RESULTS', sortOrder: 2 },
  FIXTURES: { path: 'fixtures', name: 'FIXTURES', sortOrder: 3 },
  KNOCKOUTS: { path: 'knockouts', name: 'KNOCKOUTS', sortOrder: 4 },
  STATS: { path: 'stats', name: 'STATS', sortOrder: 5 },
  POINTS: { path: 'points', name: 'POINTS', sortOrder: 6 },
  TEAMS: { path: 'teams', name: 'TEAMS', sortOrder: 7 }
};
