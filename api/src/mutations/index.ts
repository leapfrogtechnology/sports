import { login } from './login';
import { signUp } from './signUp';
import * as employee from './employees';
import { refreshAccessToken } from './refreshAccessToken';

export default { login, refreshAccessToken, signUp, ...employee };
