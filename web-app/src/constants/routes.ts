const HOME = '/';
const DOTA = '/dota2/:season';
const FIFA = '/fifa/:season';
const CHESS = '/chess/:season';
const FUTSAL = '/futsal/:season';
const CARROM_BOARD = '/carrom-board/:season';
const TABLE_TENNIS = '/table-tennis/:season';
const COUNTER_STRIKE = '/counter-strike/:season';


export const BASE_ROUTES = {
  HOME,
  DOTA,
  FIFA,
  CHESS,
  FUTSAL,
  CARROM_BOARD,
  TABLE_TENNIS,
  COUNTER_STRIKE
};

// Order of route declaration appears on the UI.
export const FUTSAL_ROUTES = {
  HOME: `${FUTSAL}/`,
  RESULTS: `${FUTSAL}/results`,
  FIXTURES: `${FUTSAL}/fixtures`,
  POINTS: `${FUTSAL}/points`,
  STATS: `${FUTSAL}/stats`,
  TEAMS: `${FUTSAL}/teams`,
  FIXTURE: `${FUTSAL}/fixture/:fixtureId`,
};

// Order of route declaration appears on the UI.
export const CARROM_BOARD_ROUTES = {
  HOME: `${CARROM_BOARD}/`,
  RESULTS: `${CARROM_BOARD}/results`,
  FIXTURES: `${CARROM_BOARD}/fixtures`,
  TEAMS: `${CARROM_BOARD}/teams`,
  FIXTURE: `${CARROM_BOARD}/fixture/:fixtureId`
};

// Order of route declaration appears on the UI.
export const TABLE_TENNIS_ROUTES = {
  HOME: `${TABLE_TENNIS}/`,
  RESULTS: `${TABLE_TENNIS}/results`,
  FIXTURES: `${TABLE_TENNIS}/fixtures`,
  TEAMS: `${TABLE_TENNIS}/teams`,
  FIXTURE: `${TABLE_TENNIS}/fixture/:fixtureId`,
};

// Order of route declaration appears on the UI.
export const CHESS_ROUTES = {
  HOME: `${CHESS}/`,
  RESULTS: `${CHESS}/results`,
  FIXTURES: `${CHESS}/fixtures`,
  TEAMS: `${CHESS}/teams`
};

// Order of route declaration appears on the UI.
export const COUNTER_STRIKE_ROUTES = {
  HOME: `${COUNTER_STRIKE}/`,
  RESULTS: `${COUNTER_STRIKE}/results`,
  FIXTURES: `${COUNTER_STRIKE}/fixtures`,
  POINTS: `${COUNTER_STRIKE}/points`,
  TEAMS: `${COUNTER_STRIKE}/teams`,
  FIXTURE: `${COUNTER_STRIKE}/fixture/:fixtureId`,
};

// Order of route declaration appears on the UI.
export const FIFA_ROUTES = {
  HOME: `${FIFA}/`,
  RESULTS: `${FIFA}/results`,
  FIXTURES: `${FIFA}/fixtures`,
  POINTS: `${FIFA}/points`,
  TEAMS: `${FIFA}/teams`,
  FIXTURE: `${FIFA}/fixture/:fixtureId`,
};

// Order of route declaration appears on the UI.
export const DOTA_ROUTES = {
  HOME: `${DOTA}/`,
  RESULTS: `${DOTA}/results`,
  FIXTURES: `${DOTA}/fixtures`,
  POINTS: `${DOTA}/points`,
  TEAMS: `${DOTA}/teams`,
};
