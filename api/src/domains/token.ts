import { User } from './user';

export interface AccessTokenData {
  user: User;
}

export interface RefreshTokenData {
  isRefreshToken: boolean;
  user: User;
}
