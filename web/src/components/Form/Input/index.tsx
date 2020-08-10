import React, { FunctionComponent } from 'react';

import classes from './Input.module.scss';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string,
  touched?: boolean,
  submitted?: boolean,
  invalid: boolean,
  validation: any
}

const Input: FunctionComponent<InputProps> = (props) => {
  const {inputFieldProps} = [props].map(({label, touched, submitted, invalid, validation, ...rest}) => {
    return {inputFieldProps: rest}
  })[0];

  const inputFieldClasses = [classes.InputField];

  if ((props.touched !== undefined && props.touched) || (props.submitted !== undefined && props.submitted)) {
    if (props.validation && props.invalid) inputFieldClasses.push(classes.Error);
  }

  return (
    <div className={classes.Input}>
      {props.label ? <label>{props.label}{props.required ? '*' : null}</label> : null}
      <input className={inputFieldClasses.join(' ')} {...inputFieldProps} />
    </div>
  );
}

export default Input;
