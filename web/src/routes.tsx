import React from 'react'

import { BrowserRouter, Route } from 'react-router-dom';

import AuthenticatedRoute from './authenticated-route';

import LoggedArea from './pages/LoggedArea';
import Login from './pages/Login';

const Routes = () => {
  return (
    <BrowserRouter>
      <Route path='/login' component={Login} exact />
      <AuthenticatedRoute path='/' component={LoggedArea} />
    </BrowserRouter>
  )
}

export default Routes;
