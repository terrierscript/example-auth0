import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import { App } from './App';
import { Home } from './Home/Home';
import { Callback } from './Callback/Callback';
import history from './history';
import { Auth0Provider } from './Auth/AuthContext';

const Routes = () => {
  return (
    <Router history={history}>
      <Route path="/" render={props => <App {...props} />} />
      <Switch>
        <Route path="/home" render={props => <Home {...props} />} />
        <Route path="/callback" render={props => <Callback {...props} />} />
      </Switch>
    </Router>
  );
};

export const makeMainRoutes = () => {
  return (
    <Auth0Provider>
      <Routes />
    </Auth0Provider>
  );
};
