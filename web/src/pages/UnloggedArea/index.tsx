import React, { useEffect } from 'react';

import UnloggedAreaRoutes from './routes';

import classes from './UnloggedArea.module.scss';

const UnloggedArea = (props: any) => {
  useEffect(() => {
    if (localStorage.getItem('token')) {
      props.history.push('/');
    }
  }, []);

  return (
    <>
      {!localStorage.getItem('token') ? 
        <div className={classes.UnloggedArea}>
          <div className={classes.SidePanel}></div>
          <div className={classes.UnloggedAreaContent}>
            <UnloggedAreaRoutes />
          </div>
        </div> : null
      }
    </>
  )
}

export default UnloggedArea;
