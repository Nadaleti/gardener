import React from 'react';
import jwtDecode from 'jwt-decode';
import { connect, ConnectedProps } from 'react-redux';
import { Route, Redirect, RouteComponentProps } from 'react-router-dom';

import store from './store';
import { logoutAction } from './store/reducers/session';

const mapDispatchToProps = (dispatch: any) => {
  return {logout: () => dispatch(logoutAction())}
}

const connector = connect(null, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

type RouteProps = PropsFromRedux & {
  path: string;
  render: Function;
};

const AuthenticatedRoute = (props: RouteProps) => {
  const isAuthenticated = () => {
    const jwt = store.getState().token;

    if (!jwt) return false;

    const decoded: { exp: number } = jwtDecode(jwt);
    const currentTime = new Date().getTime();

    return decoded.exp > currentTime / 1000;
  };

  const getComponentToRender = (routeProps: RouteComponentProps) => {
    if (isAuthenticated()) {
      return props.render(routeProps);
    } else {
      props.logout();
      return <Redirect to='/login' />
    }
  }

  return (
    <Route path={props.path} render={(routeProps: RouteComponentProps) => getComponentToRender(routeProps)} />
  )
}

export default connector(AuthenticatedRoute);
