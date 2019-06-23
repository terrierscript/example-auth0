import React, { useState } from 'react';
import { useContext, createContext, useCallback } from 'react';
import auth0 from 'auth0-js';

import { AUTH_CONFIG } from './auth0-variables';

const auth0web = new auth0.WebAuth({
  domain: AUTH_CONFIG.domain,
  clientID: AUTH_CONFIG.clientID,
  redirectUri: AUTH_CONFIG.callbackUrl,
  responseType: 'token id_token',
  scope: 'openid'
});

type Context = {
  auth: auth0.WebAuth;
};
const Auth0Context = createContext<Context>({ auth: auth0web });

export const useAuthState = () => {
  return useState({
    accessToken: null,
    idToken: null,
    expiresAt: 0
  });
};
// @ts-ignore
export const useIsAuthenticated = auth => {
  return useCallback(() => {
    let expiresAt = auth.expiresAt;
    return new Date().getTime() < expiresAt;
  }, [auth]);
};

export const Auth0Provider = ({ children }) => {
  const value = {
    auth: auth0web
  };
  return (
    <Auth0Context.Provider value={value}>{children}</Auth0Context.Provider>
  );
};

export const useAuth0Context = () => {
  return useContext(Auth0Context);
};

export const useAuth0 = () => {
  const { auth } = useContext(Auth0Context);
  const isAuthenticated = useIsAuthenticated(auth);
  const login = useCallback(() => {
    auth.authorize();
  }, [auth]);
  return {
    login,
    isAuthenticated
  };
};
