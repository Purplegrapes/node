import React from 'react';

import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';

import Login from '../root/login';
import Register from '../root/register';
import Home from '../root/home';
import Counter from '../root/counter';
import INFO from '../userInfo/info';


const getRouter = () => (
  <Router>
    <div>
      <ul>
        <li><Link to="/login">登录</Link></li>
        <li><Link to="/register">注册</Link></li>
        <li><Link to="/counter">计数</Link></li>
        <li><Link to="/info">用户信息</Link></li>
      </ul>
      <Switch>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/register" component={Register}/>
        <Route exact path="/counter" component={Counter}/>
        <Route exact path="/info" component={INFO}/>
      </Switch>
    </div>
  </Router>
);

export default getRouter;