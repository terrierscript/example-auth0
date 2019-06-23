import React, { Component } from 'react';
import { useAuth0 } from '../Auth/useAuth';

export const Home = ({ history }) => {
  const { login, isAuthenticated } = useAuth0(history);
  return (
    <div className="container">
      {isAuthenticated() && <h4>You are logged in!</h4>}
      {!isAuthenticated() && (
        <h4>
          You are not logged in! Please{' '}
          <a style={{ cursor: 'pointer' }} onClick={login}>
            Log In
          </a>{' '}
          to continue.
        </h4>
      )}
    </div>
  );
};

export default Home;
