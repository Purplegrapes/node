import { combineReducers } from 'redux';
import root from './root/reducer';
import user from './userInfo/reducer';

export default combineReducers({
  ...root,
  ...user,
});