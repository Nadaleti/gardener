import React from 'react';

import classes from './Input.module.scss';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input = (props: InputProps) => {
  return (
    <div className={classes.Input}>
      {props.label ? <label>{props.label}</label> : null}
      <input className={classes.InputField} {...props} />
    </div>
  );
}

export default Input;
