import React, { useEffect } from 'react';
import loading from './loading.svg';
import { useAuth0 } from '../Auth/useAuth';

export const Callback = props => {
  const { handleAuthentication } = useAuth0();
  const { location } = props;
  useEffect(() => {
    if (/access_token|id_token|error/.test(location.hash)) {
      handleAuthentication();
    }
  }, [handleAuthentication, location]);

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
