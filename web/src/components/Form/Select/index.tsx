import React, { FunctionComponent, useState } from 'react';

import classes from './Select.module.scss';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  defaultOptionValue: string,
  defaultOptionText: string,
  label?: string
}

const Select: FunctionComponent<SelectProps> = (props) => {
  const [selectError, setSelectError] = useState(false);

  const {onBlur, selectFieldProps} = [props].map(({label, defaultOptionValue, defaultOptionText, onBlur, ...rest}) => {
    return {onBlur, selectFieldProps: rest}
  })[0];

  const selectFieldClasses = [classes.SelectField];

  const onSelectBlur = (event: React.FocusEvent<HTMLSelectElement>) => {
    if (onBlur) onBlur(event);
    verifyError(event.target.value);
  }

  const verifyError = (value: string) => {
    if (props.required && value === props.defaultOptionValue) {
      setSelectError(true);
      return;
    }

    setSelectError(false);
  }

  if (selectError) selectFieldClasses.push(classes.Error);

  return (
    <div className={classes.Select}>
      {props.label ? <label>{props.label}{props.required ? '*' : null}</label> : null}
      <select className={selectFieldClasses.join(' ')} onBlur={onSelectBlur} {...selectFieldProps}>
        <option value={props.defaultOptionValue}>{props.defaultOptionText}</option>
        {props.children}
      </select>
    </div>
  )
}

export default Select;
