import React, { useCallback, useContext } from 'react';
import { Route, BrowserRouter, Router } from 'react-router-dom';
import { App } from './App';
import { Home } from './Home/Home';
import { Callback } from './Callback/Callback';
// import Auth from './Auth/Auth';
import {
  Auth0Provider,
  // Auth0Context
  useAuth0Context,
  useAuth0
} from './Auth/useAuth';
import history from './history';

const Routes = () => {
  return (
    <Router history={history}>
      <div>
        <Route path="/" render={props => <App {...props} />} />
        <Route path="/home" render={props => <Home {...props} />} />
        <Route
          path="/callback"
          render={props => {
            return <Callback {...props} />;
          }}
        />
      </div>
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
