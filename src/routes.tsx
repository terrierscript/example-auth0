import React, { useCallback, useContext } from 'react';
import { Route, BrowserRouter, Router } from 'react-router-dom';
import App from './App';
import Home from './Home/Home';
import Callback from './Callback/Callback';
// import Auth from './Auth/Auth';
import {
  Auth0Provider,
  // Auth0Context
  useAuth0Context,
  useAuth0
} from './Auth/useAuth';
import history from './history';

const Routes = () => {
  const { auth, handleAuthentication } = useAuth0(history);

  const _handleAuthentication = ({ location }) => {
    if (/access_token|id_token|error/.test(location.hash)) {
      handleAuthentication();
    }
  };
  return (
    <Router history={history}>
      <div>
        <Route path="/" render={props => <App auth={auth} {...props} />} />
        <Route path="/home" render={props => <Home auth={auth} {...props} />} />
        <Route
          path="/callback"
          render={props => {
            _handleAuthentication(props);
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
