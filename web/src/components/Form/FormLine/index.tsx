import React from 'react';

import classes from './FormLine.module.scss';

const FormLine = (props: any) => {
  return (
    <div className={classes.FormLine}>
      {props.children}
    </div>
  )
}

export default FormLine;
