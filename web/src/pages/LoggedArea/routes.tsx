import React from 'react';
import { Switch, RouteComponentProps, Redirect } from 'react-router-dom';
import AuthenticatedRoute from '../../authenticated-route';

import MyVases from './MyVases';

const LoggedAreaRoutes = () => {
  return (
    <Switch>
      <AuthenticatedRoute path='/vases' render={(props: RouteComponentProps) => <MyVases {...props} />} />
      <Redirect from='/' to='/vases' />
    </Switch>
  )
}

export default LoggedAreaRoutes;
