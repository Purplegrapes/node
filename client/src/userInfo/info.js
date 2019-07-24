import { compose, pure, withHandlers } from 'recompose';
import React from 'react';
import { map, prop } from 'lodash/fp';
import { connect } from 'react-redux';

import {
  getUserInfo as getUserInfoAction,
  getUserInfoFail as getUserInfoFailAction,
  getUserInfoSuccess as getUserInfoSuccessAction,
} from './actions';


export default compose(
  pure,
  connect((state) => state.users, {
    getUserInfo: getUserInfoAction,
    getUserInfoFail: getUserInfoFailAction,
    getUserInfoSuccess: getUserInfoSuccessAction,
  }),
  withHandlers({
    getUserInfo: ({ getUserInfo, getUserInfoSuccess, getUserInfoFail }) => () => {
      getUserInfo().then(() => {
        getUserInfoSuccess();
      }).catch(() => {
        getUserInfoFail();
      });
    },
  }),
)(({ isLoading, errorMsg, userInfo, getUserInfo }) => (
  <div>
    {
      isLoading ? '请求信息中......' :
        (
          errorMsg ? errorMsg :
            <div>
              {map((item) => (
                <div key={prop('_id')(item)}>
                  名字：{prop('username')(item)}
                  密码：{prop('password')(item)}
                </div>
              ))(userInfo)}
            </div>
        )
    }
    <button onClick={getUserInfo}>请求用户信息</button>
  </div>
))