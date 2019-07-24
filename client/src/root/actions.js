import { createAction, actionTypeCreator } from 'shared/utils/redux-actions';
import { post } from 'shared/entities/request';

const actionType = actionTypeCreator(__filename);

export const SET_STATE = actionType('SET_STATE');
export const LOGIN = actionType('LOGIN');
export const REGISTER = actionType('REGISTER');

export const login = createAction(
  LOGIN,
  ({ username, password }) => post('/login', ({ username, password })),
);
export const register = createAction(
  REGISTER,
  ({ username, password }) => post('/register', ({ username, password })),
);

export const setState = createAction(SET_STATE);
