import React from 'react';
import { useAuth0 } from '../Auth/useAuth';

export const Home = () => {
  const { login, isAuthenticated: isAuthenticated } = useAuth0();
  return (
    <div className="container">
      {isAuthenticated && <h4>You are logged in!</h4>}
      {!isAuthenticated && (
        <h4>
          You are not logged in! Please
          <a style={{ cursor: 'pointer' }} onClick={login}>
            Log In
          </a>
          to continue.
        </h4>
      )}
    </div>
  );
};
