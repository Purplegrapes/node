import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { createLogger } from 'redux-logger';

import fetch from 'shared/middlewares/fetch';
import reducers from './reducers';

const DEBUG = process.env.mode !== 'production';

export default (history) => {
  const middlewares = [
    fetch,
    routerMiddleware(history),
  ];

  // eslint-disable-next-line no-undef
  if (DEBUG) {
    // eslint-disable-next-line global-require
    middlewares.push(createLogger({
      collapsed: true,
    }));
  }

  return createStore(
    reducers,
    {},
    compose(
      applyMiddleware(...middlewares),
    ),
  );
};
