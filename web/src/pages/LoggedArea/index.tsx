import React, { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

import Header from './Header';

import classes from './LoggedArea.module.scss';

const mapStateToProps = (state: any) => {
  return {
    token: state.token
  }
}

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
type LoggedAreaProps = PropsFromRedux & RouteComponentProps;

const LoggedArea = (props: LoggedAreaProps) => {
  useEffect(() => {
    if (!props.token) props.history.push('/login');
  }, [props.token, props.history]);

  return (
    <div className={classes.BasePage}>
      <Header />
      Logged area
    </div>
  )
}

export default connector(LoggedArea);
