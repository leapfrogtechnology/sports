export interface StatusPayload {
  id?: number;
  name: string;
}

interface Status {
  id: number;
  name: string;
  updatedBy: number;
  createdAt: string;
  updatedAt: string;
}

export default Status;
