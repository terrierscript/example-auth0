import React, { useCallback, useEffect, useMemo } from 'react';
import { Navbar, Button } from 'react-bootstrap';
import './App.css';
import { useIsAuthenticated, useAuth0 } from './Auth/useAuth';

const useGoToHandler = history => {
  return useCallback(route => () => history.replace(`/${route}`), [history]);
};

export const App = ({ history }) => {
  const { login, logout, isAuthenticatedMemo, renewSession } = useAuth0();

  const goToHandler = useGoToHandler(history);
  useEffect(() => {
    if (localStorage.getItem('isLoggedIn') === 'true') {
      renewSession();
    }
  }, []);

  return (
    <div>
      <Navbar fluid>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#">Auth0 - React</a>
          </Navbar.Brand>
          <Button
            bsStyle="primary"
            className="btn-margin"
            onClick={goToHandler('home')}
          >
            Home
          </Button>
          {!isAuthenticatedMemo && (
            <Button
              id="qsLoginBtn"
              bsStyle="primary"
              className="btn-margin"
              onClick={login}
            >
              Log In
            </Button>
          )}
          {isAuthenticatedMemo && (
            <Button
              id="qsLogoutBtn"
              bsStyle="primary"
              className="btn-margin"
              onClick={logout}
            >
              Log Out
            </Button>
          )}
        </Navbar.Header>
      </Navbar>
    </div>
  );
};
