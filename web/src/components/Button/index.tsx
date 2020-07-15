import React, { FunctionComponent, ButtonHTMLAttributes } from 'react';

import Spinner from '../Loader';

import classes from './Button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  btnStyle?: string,
  loading?: boolean
}

const Button: FunctionComponent<ButtonProps> = (props) => {
  const buttonClasses = [classes.Button];
  const buttonProps = [props].map(({btnStyle, loading, ...rest}) => rest)[0];

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
    <button className={buttonClasses.join(' ')} {...buttonProps}>
      {props.loading ? <Spinner /> : props.children}
    </button>
  )
}

export default Button;
