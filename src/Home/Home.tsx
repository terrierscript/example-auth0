import React, { Component } from 'react';
import { useAuth0 } from '../Auth/useAuth';

export const Home = ({ history }) => {
  const { login, isAuthenticatedMemo } = useAuth0();
  return (
    <div className="container">
      {isAuthenticatedMemo && <h4>You are logged in!</h4>}
      {!isAuthenticatedMemo && (
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
