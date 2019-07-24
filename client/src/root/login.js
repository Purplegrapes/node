import { compose, pure, withHandlers, lifecycle } from 'recompose';
import React from 'react';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import Message from 'antd/lib/message';
import { connect } from 'react-redux';

import {
  setState as setStateAction,
  login as loginAction,
} from './actions';

import './index.css';
const socket = require('socket.io-client')('http://localhost:8080');   //客户端socket.io

const FormItem = Form.Item;

export default compose(
  pure,
  connect((state) => (state.root), {
    login: loginAction,
    setState: setStateAction,
  }),
  withHandlers({
    login: ({ login, username, password }) => () => {
      login({ username, password }).then(() => {
        socket.emit('loginSuccess', username);

        socket.on('success', (successMsg) => {
          Message.success(successMsg)
        });
      }).catch(() => {
        socket.emit('loginFailed');

        socket.on('failed', (errorMsg) => {
          Message.success(errorMsg)
        });
      })
    },
    updateName: ({ setState }) => (e) => {
      setState({ username: e.target.value });
    },
    updatePassword: ({ setState }) => (e) => {
      setState({ password: e.target.value });
    }
  }),
)(({ username, password, login, updateName, updatePassword }) => (
  <div>
    <Form layout="inline" autoComplete="off">
      <FormItem label="姓">
        <Input
          className="Input"
          onChange={updateName}
          value={username}
        />
      </FormItem>
      <FormItem label="名">
        <Input
          className="Input"
          value={password}
          onChange={updatePassword}
        />
      </FormItem>
      <FormItem>
        <Button
          onClick={login}
          size="large"
          type="primary"
          htmlType="submit"
        >
          登录
        </Button>
      </FormItem>
    </Form>

  </div>
))