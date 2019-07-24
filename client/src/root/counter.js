import { compose, pure, withHandlers, setDisplayName } from 'recompose';
import React from 'react';
import { connect } from 'react-redux';
import {
  setState as setStateAction,
} from './actions';

const mapStateToProps = (state) => {
  console.log(state);
  return {
    ...state.root,
  }
};
export default compose(
  pure,
  connect(mapStateToProps, {
    setState: setStateAction,
  }),
  setDisplayName(__filename),
  withHandlers({
    increment: ({ setState, counter }) => () => {
      setState({
        counter: counter + 1,
      })
    },
    decrement: ({ setState, counter }) => () => {
      setState({
        counter: counter - 1,
      })
    },
    reset: ({ setState }) => () => {
      setState({
        counter: 0,
      })
    },

  }),
)(({ increment, decrement, reset, counter }) => (
  <div>
    <div>{counter}</div>
    <button onClick={increment}>自增
    </button>
    <button onClick={decrement}>自减
    </button>
    <button onClick={reset}>重置
    </button>
  </div>
))
