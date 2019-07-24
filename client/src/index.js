import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router';
import useBasename from 'history/lib/useBasename';
import { AppContainer } from 'react-hot-loader';
import createStore from './create-store';

import getRouter from './router/router';

import './antd_.less';

const finalHistory = useBasename(() => browserHistory)({ basename: '/' });
const store = createStore(finalHistory);


renderWithHotReload(getRouter());

/*热更新*/
if (module.hot) {
  module.hot.accept('./router/router', () => {
    const getRouter = require('./router/router').default;
    renderWithHotReload(getRouter());
  });
}

function renderWithHotReload(RootElement) {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        {RootElement}
      </Provider>
    </AppContainer>,
    document.getElementById('root')
  )
}