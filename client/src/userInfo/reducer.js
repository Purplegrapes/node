import { handleActions } from 'shared/utils/redux-actions';
import {
  GET_USER_INFO_REQUEST,
  GET_USER_INFO_FAIL,
  GET_USER_INFO_SUCCESS,
} from './actions';

export default {
  users: handleActions({
    [GET_USER_INFO_REQUEST]: (state, { payload }) => {
      return ({
        ...state,
        isLoading: true,
        errorMsg: '',
        userInfo: payload,
      });
    },
    [GET_USER_INFO_SUCCESS]: (state) => ({
      ...state,
      isLoading: false,
      errorMsg: '',
    }),
    [GET_USER_INFO_FAIL]: (state) => ({
      ...state,
      isLoading: false,
      errorMsg: '请求错误',
    }),

  }, {
    counter: 0,
  }),
};
