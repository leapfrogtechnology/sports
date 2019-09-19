import GameInterface from './Game';

export interface TournamentPayloadInterface {
  id?: number;
  name: string;
  season: string;
  gameId: number;
  startDate: string;
  finishDate: string;
  registrationFormUrl: string;
}

interface TournamentInterface {
  id: number;
  name: string;
  season: string;
  startDate: string;
  finishDate: string;
  game: GameInterface;
  registrationFormUrl: string;
}

export default TournamentInterface;
