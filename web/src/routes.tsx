import React from 'react'

import { BrowserRouter, Route } from 'react-router-dom';

import AuthenticatedRoute from './authenticated-route';

import LoggedAreaLayout from './pages/LoggedArea';
import Login from './pages/UnloggedArea/Login';
import SignUp from './pages/UnloggedArea/SignUp';

const Routes = () => {
  return (
    <BrowserRouter>
      <Route path='/login' component={Login} />
      <Route path='/cadastro' component={SignUp} />
      <AuthenticatedRoute path='/' component={LoggedAreaLayout} />
    </BrowserRouter>
  )
}

export default Routes;
