export interface GamePayload {
  id?: number;
  name: string;
  shortName: string;
}

interface Game {
  id: number;
  name: string;
  shortName: string;
  updatedBy: number;
  createdAt: string;
  updatedAt: string;
}

export default Game;
