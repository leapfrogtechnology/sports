export interface Employee {
  id: number;
  email: string;
  status: string;
  updatedAt: Date;
  createdAt: Date;
  lastName: string;
  firstName: string;
  middleName: string;
  emsEmployeeId: number;
  profilePictureUrl: string;
}

export interface DBEmployeePayload {
  id?: number;
  email: string;
  status: string;
  lastName: string;
  firstName: string;
  updatedAt: string;
  emsEmployeeId: number;
  middleName: string | null;
  profilePictureUrl: string;
}

export interface EMSEmployee {
  id: number;
  avatarUrl: string;
  empId: string;
  empStatus: string;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  githubId: string | null;
  isHod: boolean;
  isHr: boolean;
  isRaffleEligible: boolean;
  isSupervisor: boolean;
  middleName: string | null;
  mobilePhone: string;
  temporaryAddress: string;
  bloodGroup: string;
  isProjectManager: boolean;
  isTeamLead: boolean;
  isAccountManager: boolean;
  isCoach: boolean;
  isPeopleOps: boolean;
  isProxypm: boolean;
  isResourceManager: boolean;
  coachId: number | null;
  permanentAddress: string;
  skypeId: string | null;
  homePhone: string;
  birthday: string;
  supervisor: {
    id: number;
    avatarUrl: string;
    firstName: string;
    lastName: string;
    email: string;
  };
}

export default Employee;
