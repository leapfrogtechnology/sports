import { login } from './login';
import { signUp } from './signUp';
import { userInfo } from './user';
import { createGame, editGame, deleteGame } from './game';
import { refreshAccessToken } from './refreshAccessToken';
import { createRound, editRound, deleteRound } from './round';
import { createStatus, editStatus, deleteStatus } from './status';
import { createCategory, editCategory, deleteCategory } from './category';
import { createTournament, editTournament, deleteTournament } from './tournament';

export default {
  // Users
  login,
  refreshAccessToken,
  signUp,
  userInfo,

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
  deleteRound,

  // Statuses
  editStatus,
  createStatus,
  deleteStatus,

  // Tournament
  editTournament,
  createTournament,
  deleteTournament
};
