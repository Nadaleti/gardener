import React, { FunctionComponent, useState } from 'react';

import classes from './Input.module.scss';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

const Input: FunctionComponent<InputProps> = (props) => {
  const [inputError, setInputError] = useState(false);

  const {onBlur, inputFieldProps} = [props].map(({label, onBlur, ...rest}) => {
    return {onBlur, inputFieldProps: rest}
  })[0];
  const inputFieldClasses = [classes.InputField];

  const onInputBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    if (onBlur) onBlur(event);
    verifyError(event.target.value);
  }

  const verifyError = (value: string) => {
    if (props.required && (!value || value === '')) {
      setInputError(true);
      return;
    }

    if (props.type === 'email' && value !== '') {
      setInputError(!isEmail(value));
      return;
    }

    setInputError(false);
  }

  const isEmail = (email: string): boolean => {
    const firstAtPos = email.indexOf('@');
    const lastAtPos = email.lastIndexOf('@');
    const lastDotPos = email.lastIndexOf('.');
    
    return email.length > 2 &&
      lastAtPos !== -1 && lastDotPos !== -1 &&
      firstAtPos === lastAtPos &&
      lastAtPos < lastDotPos &&
      lastAtPos > 0 && lastDotPos > 0 &&
      lastDotPos - lastAtPos > 1;
  }

  if (inputError) inputFieldClasses.push(classes.Error);

  return (
    <div className={classes.Input}>
      {props.label ? <label>{props.label}{props.required ? '*' : null}</label> : null}
      <input className={inputFieldClasses.join(' ')} onBlur={(event) => onInputBlur(event)} {...inputFieldProps} />
    </div>
  );
}

export default Input;
