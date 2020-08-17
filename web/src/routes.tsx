import React from 'react'

import { BrowserRouter, Route } from 'react-router-dom';

import AuthenticatedRoute from './authenticated-route';

import LoggedArea from './pages/LoggedArea';
import Login from './pages/UnloggedArea/Login';
import SignUp from './pages/UnloggedArea/SignUp';

const Routes = () => {
  return (
    <BrowserRouter>
      <Route path='/login' component={Login} exact />
      <Route path='/cadastro' component={SignUp} exact />
      <AuthenticatedRoute path='/' component={LoggedArea} />
    </BrowserRouter>
  )
}

export default Routes;
