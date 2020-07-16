import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from '../Login';
import SignUp from '../SignUp';

const UnloggedAreaRoutes = () => {
  return (
    <Switch>
      <Route path='/login' component={Login} />
      <Route path='/cadastro' component={SignUp} />
    </Switch>
  )
}

export default UnloggedAreaRoutes;
