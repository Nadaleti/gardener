import React from 'react';

import { FIELD_TYPES } from '../FieldTypes.enum';
import Input from '../Input';
import Select from '../Select';
import Radio from '../Radio';

interface Field {
  fieldType: FIELD_TYPES;
  label?: string;
  name: string;
  valid: boolean;
  submitted?  : boolean;
  touched?: boolean;
  value: string;
  validation: any;
  config: any;
}

interface FieldProps {
  field: Field,
  onChange: Function
}

const Field = (props: FieldProps) => {
  const getFieldElement = () => {
    let fieldElement = null;

    switch (props.field.fieldType) {
      case FIELD_TYPES.INPUT:
        fieldElement = <Input
          label={props.field.label}
          invalid={!props.field.valid}
          submitted={props.field.submitted}
          touched={props.field.touched}
          validation={props.field.validation}
          onChange={props.onChange}
          {...props.field.config}
        />
        break;

      case FIELD_TYPES.SELECT:
        fieldElement = <Select
          label={props.field.label}
          invalid={!props.field.valid}
          submitted={props.field.submitted}
          touched={props.field.touched}
          validation={props.field.validation}
          value={props.field.value}
          onChange={props.onChange}
          {...props.field.config}
        >
          {props.field.config.options.map((option: any) =>
            <option key={option.value} value={option.value}>{option.name}</option>
          )}
        </Select>
        break;

      case FIELD_TYPES.RADIO:
        fieldElement = <Radio
          label={props.field.label}
          name={props.field.name}
          value={props.field.value}
          optionChange={props.onChange}
          {...props.field.config}
        />
        break;

      default:
        break;
    }

    return fieldElement;
  }

  return (
    <>{getFieldElement()}</>
  )
}

export default Field;
