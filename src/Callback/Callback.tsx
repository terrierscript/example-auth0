import React, { Component, useCallback } from 'react';
import loading from './loading.svg';
import { useAuth0 } from '../Auth/useAuth';

export const Callback = props => {
  const { handleAuthentication } = useAuth0(history);

  const _handleAuthentication = useCallback(
    ({ location }) => {
      if (/access_token|id_token|error/.test(location.hash)) {
        handleAuthentication();
      }
    },
    [handleAuthentication]
  );
  console.log('cb');
  _handleAuthentication(props);

  const style = {
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    height: '100vh',
    width: '100vw',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white'
  };

  return (
    <div style={style}>
      <img src={loading} alt="loading" />
    </div>
  );
};
