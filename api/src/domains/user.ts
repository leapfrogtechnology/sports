export interface Users {
  id: number;
  employee_id: number;
  user_role_id: number;
  password: string;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}
