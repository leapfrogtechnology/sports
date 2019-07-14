export interface Employee {
  id: number;
  email: string;
  status: string;
  updatedAt: Date;
  createdAt: Date;
  lastName: string;
  firstName: string;
  middleName?: string;
  emsEmployeeId: number;
  profilePictureUrl: string;
}

export interface LMSEmployee {
  address: { permanentAddress: string; temporaryAddress?: string };
  avatarUrl: string;
  contact: { githubId?: string; homePhone: null; mobilePhone: string; skypeId?: string };
  dateCreated: string;
  dateofBirth: string;
  department: { id: number; name: string };
  designation: string;
  empId: string;
  empStatus: string;
  firstName: string;
  gender: string;
  id: number;
  isHod: boolean;
  isHr: boolean;
  isRaffleEligible: boolean;
  isSupervisor: boolean;
  joinDate: string;
  lastName: string;
  lastUpdated: string;
  maritialStatus: string;
  middleName?: string;
  projects: null;
  role: string;
  supervisor: {
    avatarUrl: string;
    department: any;
    empId: string;
    firstName: string;
    id: number;
    lastName: string;
    middleName?: string;
  };
  username: string;
}
