export interface RoundPayload {
  id?: number;
  name: string;
  shortName: string;
  sortOrder: number;
}

interface Round {
  id: number;
  name: string;
  shortName: string;
  sortOrder: number;
  updatedBy: number;
  createdAt: string;
  updatedAt: string;
}

export default Round;
