import React from 'react';
import jwtDecode from 'jwt-decode';

import { Route, Redirect } from 'react-router-dom';

interface RouteProps {
  path: string;
  component: Function;
}

const AuthenticatedRoute = (props: RouteProps) => {
  const isAuthenticated = () => {
    const jwt = localStorage.getItem('token');

    if (!jwt) return false;

    const decoded: {exp: number} = jwtDecode(jwt);
    const currentTime = new Date().getTime();

    return decoded.exp > currentTime/1000;
  };

  return (
    <Route exact path={props.path} render={() => 
      isAuthenticated() ? props.component() : <Redirect to='/login' />} />
  )
}

export default AuthenticatedRoute;
