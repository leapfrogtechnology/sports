export interface PlayerInterface {
  id: number;
  name: string;
  team?: TeamInterface;
  isCaptain?: boolean;
}

export interface ParticipantLogoInterface {
  text?: string;
  color?: string;
  backgroundColor?: string;
}

export interface TeamInterface {
  id: number;
  name: string;
  logo?: ParticipantLogoInterface;
  players?: PlayerInterface[];
  category: string;
}

export interface StatInterface {
  name: PlayerInterface;
  count: number;
}

export interface PointInterface {
  id?: number;
  team: TeamInterface;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
}

export interface StatsInterface {
  goals?: StatInterface[];
  redCards?: StatInterface[];
  yellowCards?: StatInterface[];
}

export interface ActivityInterface {
  id: number;
  fixtureId: number;
  player: string;
  team: TeamInterface;
  time?: number | string;
  points?: number;
  teamType: string;
  type: string;
  assistBy?: string;
  homeTeamPoints: number;
  awayTeamPoints: number;
}

export interface RoundInterface {
  id: number;
  description: string;
  sortOrder: number;
  shortName: string;
}

export interface StatusInterface {
  id: number;
  description: string;
}

export interface CategoryInterface {
  id: number;
  description: string;
}

export interface DetailsInterface {
  title: string;
  year: number;
  startDate: string;
  finishDate: string;
  winners: object[];
  winner: string;
  runnerUp: string;
}

export interface FixtureInterface {
  id: number;
  date: string;
  homeTeam: TeamInterface;
  homeTeamScore: number;
  homeTeamHalfTimeScore?: number;
  awayTeam: TeamInterface;
  awayTeamScore: number;
  awayTeamHalfTimeScore?: number;
  status: string;
  activities?: ActivityInterface[];
  categoryType: string;
  round: string;
  winnerTeam?: TeamInterface;
  homeTeamParentFixtureId: number;
  awayTeamParentFixtureId: number;
}

export interface RecentsInterface {
  results: FixtureInterface[];
  fixtures: FixtureInterface[];
  winners: object[];
  showWinners: boolean;
}

export interface TournamentDataResponseInterface {
  details: DetailsInterface;
  teams: TeamInterface[];
  fixtures: FixtureInterface[];
  stats?: StatsInterface[];
  table?: PointInterface[];
  rounds?: RoundInterface[];
  categories?: CategoryInterface[];
  statuses?: StatusInterface[];
}

export interface TournamentDataInterface {
  teams: TeamInterface[];
  rounds?: RoundInterface[];
  details: DetailsInterface;
  statuses?: StatusInterface[];
  categories?: CategoryInterface[];
  recents: RecentsInterface;
  results: FixtureInterface[];
  fixtures: FixtureInterface[];
  allFixtures?: FixtureInterface[];
  points?: PointInterface[];
  stats?: StatsInterface[];
}


export interface SeasonInterface {
  id: number;
  name: string;
  season: string | number;
  shortName?: string;
  startDate: string;
  endDate?: string;
  fileUrl?: string;
  competition?: string;
  parentTournament?: {
    id: number;
    name: string;
    shortName: string;
  };
}

export interface TournamentInterface {
  id: number;
  name: string;
  shortName: string;
  seasons: SeasonInterface[];
}

export interface RecentTournamentsInterface {
  current: SeasonInterface[];
  upcoming: SeasonInterface[];
  past: SeasonInterface[];
}
