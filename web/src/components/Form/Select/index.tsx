import React, { FunctionComponent } from 'react';

import classes from './Select.module.scss';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
}

const Select: FunctionComponent<SelectProps> = (props) => {
  const {selectFieldProps} = [props].map(({label, ...rest}) => {
    return {selectFieldProps: rest}
  })[0];

  return (
    <div className={classes.Select}>
      {props.label ? <label>{props.label}{props.required ? '*' : null}</label> : null}
      <select className={classes.SelectField} {...selectFieldProps}>
        {props.children}
      </select>
    </div>
  )
}

export default Select;
