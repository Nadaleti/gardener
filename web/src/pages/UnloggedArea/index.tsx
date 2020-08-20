import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import classes from './UnloggedAreaLayout.module.scss';

const UnloggedAreaLayout = (props: any) => {
  return (
    <>
      {!props.token ? 
        <div className={classes.UnloggedAreaLayout}>
          <div className={classes.SidePanel}></div>
          <div className={classes.UnloggedAreaContent}>
            {props.children}
          </div>
        </div> : <Redirect to='/' />
      }
    </>
  )
}

const mapStateToProps = (state: any) => {
  return {
    token: state.token
  }
}

export default connect(mapStateToProps, null)(UnloggedAreaLayout);
