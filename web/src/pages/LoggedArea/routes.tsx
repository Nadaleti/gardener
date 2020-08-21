import React from 'react';
import { Switch, RouteComponentProps, Redirect } from 'react-router-dom';
import AuthenticatedRoute from '../../authenticated-route';

import MyVases from './MyVases';
import CreateVase from './CreateVase';

const LoggedAreaRoutes = () => {
  return (
    <Switch>
      <AuthenticatedRoute path='/vasos' exact render={(props: RouteComponentProps) => <MyVases {...props} />} />
      <AuthenticatedRoute path='/vasos/novo' exact render={(props: RouteComponentProps) => <CreateVase {...props} />} />
      <Redirect from='/' to='/vasos' />
    </Switch>
  )
}

export default LoggedAreaRoutes;
