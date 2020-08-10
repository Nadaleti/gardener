import React, { FunctionComponent } from 'react';

import classes from './Radio.module.scss';

interface RadioOption {
  name: string;
  value: string;
}

interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name: string;
  options: RadioOption[];
  optionChange: Function;
}

const Radio: FunctionComponent<RadioProps> = (props) => {
  return (
    <div className={classes.RadioContainer}>
      {props.label ? <label className={classes.Label}>{props.label}{props.required ? '*' : null}</label> : null}

      <div className={classes.OptionsContainer}>
        {props.options.map((option: RadioOption) => {
          return <label key={option.value} className={classes.Option}>{option.name}
            <input
              type="radio"
              name={props.name}
              value={option.value}
              onChange={() => props.optionChange(option.value)}
              checked={props.value === option.value} />
            <span className={classes.Checkmark}></span>
          </label>
        })}
      </div>
    </div>
  )
}

export default Radio;
