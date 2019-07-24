import { compose, pure, withHandlers } from 'recompose';
import React from 'react';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import { connect } from 'react-redux';

import {
  setState as setStateAction,
  register as registerAction,
} from './actions';
import Message from "antd/lib/message";

const FormItem = Form.Item;

export default compose(
  pure,
  connect((state) => (state.root), {
    register: registerAction,
    setState: setStateAction,
  }),
  withHandlers({
    register: ({ register, username, password }) => () => {
      register({ username, password }).then(({ payload }) => {
        Message.info(payload);
      })
    },
    updateName: ({ setState }) => (e) => {
      setState({ username: e.target.value });
    },
    updatePassword: ({ setState }) => (e) => {
      setState({ password: e.target.value });
    }
  }),
)(({ username, password, register, updateName, updatePassword }) => (
  <div>
    <Form layout="horizontal" autoComplete="off">
      <FormItem label="姓">
        <Input
          onChange={updateName}
          value={username}
        />
      </FormItem>
      <FormItem label="名">
        <Input
          value={password}
          onChange={updatePassword}
        />
      </FormItem>
      <FormItem>
        <Button
          onClick={register}
          size="large"
          type="primary"
          htmlType="submit"
        >
          注册
        </Button>
      </FormItem>
    </Form>

  </div>
))