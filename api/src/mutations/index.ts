import { login } from './login';
import { signUp } from './signUp';
import { createGame, editGame, deleteGame } from './game';
import { refreshAccessToken } from './refreshAccessToken';
import { createRound, editRound, deleteRound } from './rounds';
import { createCategory, editCategory, deleteCategory } from './category';

export default {
  // Users
  login,
  refreshAccessToken,
  signUp,

  // Games
  editGame,
  createGame,
  deleteGame,

  // Categories
  editCategory,
  createCategory,
  deleteCategory,

  // Rounds
  editRound,
  createRound,
  deleteRound
};
