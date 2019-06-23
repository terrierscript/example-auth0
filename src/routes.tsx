import React, { useCallback, useContext } from 'react';
import { Route, BrowserRouter, Router } from 'react-router-dom';
import App from './App';
import Home from './Home/Home';
import Callback from './Callback/Callback';
// import Auth from './Auth/Auth';
import {
  Auth0Provider,
  // Auth0Context
  useAuth0Context
} from './Auth/useAuth';
import history from './history';

// const auth = new Auth();

// const handleAuthentication = ({ location }) => {
//   if (/access_token|id_token|error/.test(location.hash)) {
//     auth.handleAuthentication();
//   }
// };

const Routes = () => {
  const a = useAuth0Context();
  const { auth } = useAuth0Context();

  const handleAuthentication = useCallback(
    location => {
      if (/access_token|id_token|error/.test(location.hash)) {
        auth.handleAuthentication();
      }
    },
    [auth]
  );
  return (
    <Router history={history}>
      <div>
        <Route path="/" render={props => <App auth={auth} {...props} />} />
        <Route path="/home" render={props => <Home auth={auth} {...props} />} />
        <Route
          path="/callback"
          render={props => {
            handleAuthentication(props);
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
