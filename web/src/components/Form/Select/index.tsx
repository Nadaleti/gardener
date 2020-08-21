import React, { FunctionComponent } from 'react';

import classes from './Select.module.scss';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  defaultOptionValue?: string,
  defaultOptionText?: string,
  label?: string,
  touched?: boolean;
  submitted?: boolean;
  invalid: boolean;
  validation: any;
}

const Select: FunctionComponent<SelectProps> = (props) => {
  const {selectFieldProps} = [props].map(({label, defaultOptionValue, defaultOptionText, touched, submitted, invalid, validation, ...rest}) => {
    return {selectFieldProps: rest}
  })[0];

  const selectFieldClasses = [classes.SelectField];

  if ((props.touched !== undefined && props.touched) || (props.submitted !== undefined && props.submitted)) {
    if (props.validation && props.invalid) selectFieldClasses.push(classes.Error);
  }

  return (
    <div className={classes.Select}>
      {props.label ? <label>{props.label}{props.required ? '*' : null}</label> : null}
      <select className={selectFieldClasses.join(' ')} {...selectFieldProps}>
        {props.defaultOptionValue !== undefined ?
          <option value={props.defaultOptionValue}>{props.defaultOptionText}</option> : null}
        {props.children}
      </select>
    </div>
  )
}

export default Select;
