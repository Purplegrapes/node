import { handleActions } from 'shared/utils/redux-actions';
import {
  SET_STATE,
} from './actions';

export default {
  root: handleActions({
    [SET_STATE]: (root, { payload }) => ({
      ...root,
      ...payload,
    }),
  }, {
    counter: 0,
  }),
};
