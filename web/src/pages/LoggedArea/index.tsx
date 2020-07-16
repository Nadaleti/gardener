import React from 'react';

import Header from './Header';

import classes from './LoggedArea.module.scss';

const LoggedAreaLayout = () => {
  return (
    <div className={classes.BasePage}>
      <Header />
      Logged area
    </div>
  )
}

export default LoggedAreaLayout;
