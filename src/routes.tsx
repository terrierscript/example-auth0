import React, { useCallback, useContext, useEffect } from 'react';
import { Route, BrowserRouter, Router, Switch } from 'react-router-dom';
import { App } from './App';
import { Home } from './Home/Home';
import { Callback } from './Callback/Callback';
// import Auth from './Auth/Auth';
import { Auth0Provider, useAuth0 } from './Auth/useAuth';
import history from './history';

const Routes = () => {
  const { renewSession } = useAuth0();

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
