import { createAction, actionTypeCreator } from 'shared/utils/redux-actions';
import { read } from 'shared/entities/request';

const actionType = actionTypeCreator(__filename);

export const GET_USER_INFO_REQUEST = actionType('GET_USER_INFO_REQUEST');
export const GET_USER_INFO_SUCCESS = actionType('GET_USER_INFO_SUCCESS');
export const GET_USER_INFO_FAIL = actionType('GET_USER_INFO_FAIL');

export const getUserInfo = createAction(GET_USER_INFO_REQUEST, () => read('/userList'));
export const getUserInfoSuccess = createAction(GET_USER_INFO_SUCCESS);
export const getUserInfoFail = createAction(GET_USER_INFO_FAIL);
