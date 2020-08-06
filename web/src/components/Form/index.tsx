import React, { FormEvent, useState } from 'react';

import { FIELD_TYPES } from './FieldTypes.enum';

interface FormProps {
  children: Function;
  className?: string;
  fields: Field[];
  setFields: Function;
  onSubmit: Function;
};

interface Field {
  fieldType: FIELD_TYPES;
  label?: string;
  name: string;
  valid: boolean;
  touched?: boolean;
  submitted?: boolean;
  value: string;
  validation: any;
  config: any;
}

const Form = (props: FormProps) => {
  const [submitted, setSubmitted] = useState(false);

  const setValue = (fieldName: string, value: any) => {
    const newFields = [...props.fields];
    const changedFieldIdx = newFields.findIndex((field: Field) => field.name === fieldName);
    const newField = { ...newFields[changedFieldIdx] };

    newField.value = value;

    if (newField.touched !== undefined) {
      newField.touched = true;
    }

    newField.valid = validateFormField(fieldName, value);

    newFields[changedFieldIdx] = newField;

    props.setFields(newFields);
  }

  const validateFormField = (fieldName: string, value: any): boolean => {
    let isValid = true;
    const field = props.fields.find((field: Field) => field.name === fieldName);

    if (!field) return false;

    if (field.fieldType === FIELD_TYPES.INPUT) {
      if (field.validation.required) isValid = value.trim() !== '' && isValid;
      if (field.validation.minLength) isValid = (value.length >= field.validation.minLength) && isValid;
      if (field.validation.maxLength) isValid = (value.length <= field.validation.maxLength) && isValid;
      if (field.validation.isEmail) isValid = isEmail(value) && isValid;
    }

    if (field.fieldType === FIELD_TYPES.SELECT) {
      if (field.validation.required)
        isValid = field.config.defaultOptionValue !== undefined && value !== field.config.defaultOptionValue && isValid;
    }

    return isValid;
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
      lastDotPos < email.length - 1 &&
      lastDotPos - lastAtPos > 1;
  }

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();

    const values = props.fields.map((field: Field) => {
      return {
        name: field.name,
        value: field.value
      }
    });

    if (!submitted) {
      setSubmitted(true);

      const newFields = [...props.fields];
      
      for (let i = 0; i < newFields.length; i++) {
        if (newFields[i].submitted === undefined) {
          continue;
        }

        const newField = { ...newFields[i] };
        newField.submitted = true;
        newFields[i] = newField;
      }

      props.setFields(newFields);
    }

    props.onSubmit(values);
  }

  return (
    <form
      className={props.className}
      onSubmit={onSubmit}
    >
      {props.children(setValue)}
    </form>
  );
}

export default Form;
