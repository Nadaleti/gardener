import React from 'react';

import classes from './UnloggedAreaLayout.module.scss';

const UnloggedAreaLayout = (props: any) => {
  return (
    <>
      {!localStorage.getItem('token') ? 
        <div className={classes.UnloggedAreaLayout}>
          <div className={classes.SidePanel}></div>
          <div className={classes.UnloggedAreaContent}>
            {props.children}
          </div>
        </div> : null
      }
    </>
  )
}

export default UnloggedAreaLayout;
