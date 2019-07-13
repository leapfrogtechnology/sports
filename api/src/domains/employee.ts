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

export interface LMSEmployee {
  id: number;
  avatarUrl?: string;
  empId: string;
  empStatus: string;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  githubId?: string;
  isHod: boolean;
  isHr: boolean;
  isRaffleEligible: boolean;
  isSupervisor: boolean;
  middleName?: string;
  mobilePhone: string;
  temporaryAddress?: string;
  bloodGroup?: string;
  isProjectManager: boolean;
  isTeamLead: boolean;
  isAccountManager: boolean;
  isCoach: boolean;
  isPeopleOps: boolean;
  isProxypm: boolean;
  isResourceManager: boolean;
  coachId?: string;
  supervisorId?: string;
  permanentAddress: string;
  skypeId?: string;
  homePhone?: string;
}
