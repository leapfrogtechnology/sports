export interface TournamentPayload {
  id?: number;
  name: string;
  gameId: number;
  season: string;
  startDate: string;
  finishDate: string;
  registrationFormUrl: string;
}

interface Tournament {
  id: number;
  name: string;
  gameId: number;
  season: string;
  startDate: string;
  finishDate: string;
  registrationFormUrl: string;
}

export default Tournament;
