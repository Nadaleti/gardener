import React from 'react'

import { BrowserRouter, Route } from 'react-router-dom';

import AuthenticatedRoute from './authenticated-route';

import LoggedArea from './pages/LoggedArea';
import UnloggedArea from './pages/UnloggedArea';

const Routes = () => {
  return (
    <BrowserRouter>
      <Route path='/' component={UnloggedArea} />
      <AuthenticatedRoute path='/' component={LoggedArea} />
    </BrowserRouter>
  )
}

export default Routes;
