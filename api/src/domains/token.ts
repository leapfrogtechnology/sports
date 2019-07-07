import { Users } from './user';

export interface AccessTokenData {
  user: Users;
}

export interface RefreshTokenData {
  isRefreshToken: boolean;
  user: Users;
}
