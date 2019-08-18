import { login } from './login';
import { signUp } from './signUp';
import { createGame } from './game';
import { refreshAccessToken } from './refreshAccessToken';

export default {
  // Users
  login,
  refreshAccessToken,
  signUp,

  // Games
  createGame
};
