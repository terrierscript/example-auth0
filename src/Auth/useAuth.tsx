import React, { useState } from 'react';
import { useContext, createContext, useCallback } from 'react';
import { WebAuth } from 'auth0-js';

import { AUTH_CONFIG } from './auth0-variables';

const generateAuth = () => {
  return new WebAuth({
    domain: AUTH_CONFIG.domain,
    clientID: AUTH_CONFIG.clientID,
    redirectUri: AUTH_CONFIG.callbackUrl,
    responseType: 'token id_token',
    scope: 'openid'
  });
};
type Context = {
  auth0: auth0.WebAuth;
};
const Auth0Context = createContext<Context>(null);

export const useAuthState = () => {
  return useState({
    accessToken: null,
    idToken: null,
    expiresAt: 0
  });
};

export const useIsAuthenticated = (auth, expiresAt) => {
  return useCallback(() => {
    return new Date().getTime() < expiresAt;
  }, [auth]);
};

export const Auth0Provider = ({ children }) => {
  const value = {
    auth0: generateAuth()
  };
  return (
    <Auth0Context.Provider value={value}>{children}</Auth0Context.Provider>
  );
};

export const useAuth0Context = () => {
  return useContext(Auth0Context);
};

export const useAuth0 = history => {
  const { auth0 } = useContext(Auth0Context);
  const [authState, updateAuthState] = useAuthState();
  const isAuthenticated = useIsAuthenticated(auth0, authState.expiresAt);

  const login = () => {
    console.log(auth0);
    auth0.authorize();
  };

  const logout = () => {
    updateAuthState({
      accessToken: null,
      idToken: null,
      expiresAt: 0
    });
    localStorage.removeItem('isLoggedIn');

    auth0.logout({
      returnTo: window.location.origin
    });

    // navigate to the home route
    history.replace('/home');
  };

  const setSession = authResult => {
    localStorage.setItem('isLoggedIn', 'true');

    let expiresAt = authResult.expiresIn * 1000 + new Date().getTime();
    updateAuthState({
      accessToken: authResult.accessToken,
      idToken: authResult.idToken,
      expiresAt: expiresAt
    });
    history.replace('/home');
  };

  const renewSession = () => {
    auth0.checkSession({}, (err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        setSession(authResult);
      } else if (err) {
        logout();
        console.log(err);
        // alert(
        //   `Could not get a new token (${err.error}: ${err.error_description}).`
        // );
      }
    });
  };
  const handleAuthentication = () => {
    console.log(auth0);
    auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        setSession(authResult);
      } else if (err) {
        history.replace('/home');
        console.log(err);
        // alert(`Error: ${err.error}. Check the console for further details.`);
      }
    });
  };
  return {
    auth: auth0,
    login,
    logout,
    handleAuthentication,
    isAuthenticated,
    renewSession,
    authState
  };
};
