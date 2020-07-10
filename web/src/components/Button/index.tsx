import React, { FunctionComponent, ButtonHTMLAttributes } from 'react';

import classes from './Button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  btnStyle?: string;
}

const Button: FunctionComponent<ButtonProps> = (props) => {
  const buttonClasses = [classes.Button];

  switch(props.btnStyle) {
    case 'secondary':
      buttonClasses.push(classes.Secondary);
      break;
    case 'primary':
    default:
      buttonClasses.push(classes.Primary);
      break;
  }

  return (
    <button className={buttonClasses.join(' ')} {...props}>
      {props.children}
    </button>
  )
}

export default Button;
