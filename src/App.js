import React, { useCallback, useEffect, useMemo } from 'react';
import { Navbar, Button } from 'react-bootstrap';
import './App.css';

const useAuth = auth => {
  useEffect(() => {
    const { renewSession } = auth;
    if (localStorage.getItem('isLoggedIn') === 'true') {
      renewSession();
    }
  }, []);
};

const useGoToHandler = history => {
  return useCallback(route => () => history.replace(`/${route}`), [history]);
};
const App = ({ auth, history }) => {
  useAuth(auth);
  const { isAuthenticated } = auth;
  const goToHandler = useGoToHandler(history);
  const login = useCallback(() => auth.login(), [auth]);
  const logout = useCallback(() => auth.logout(), [auth]);
  console.log(isAuthenticated());

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
          {!isAuthenticated() && (
            <Button
              id="qsLoginBtn"
              bsStyle="primary"
              className="btn-margin"
              onClick={login}
            >
              Log In
            </Button>
          )}
          {isAuthenticated() && (
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
export default App;
