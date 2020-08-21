import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import axios from '../../../axios';
import Button from '../../../components/Button';
import Form from '../../../components/Form';
import Field from '../../../components/Form/Field';
import { FIELD_TYPES } from '../../../components/Form/FieldTypes.enum';

import classes from './CreateVase.module.scss';
import { AxiosResponse, AxiosError } from 'axios';
import useUserInfo from '../../../hooks/useUserInfo';
import { toast } from 'react-toastify';

interface PlantType {
  name: string;
  iconPath: string;
  value: string;
}

const CreateVase = (props: RouteComponentProps) => {
  // TODO: Sugerir diferentes tipos de nomes de vasos
  // TODO: Caso não preenchido, buscar pelo último vaso chamado "Vaso X" e nomear como "Vaso X+1"
  const [formFields, setFormFields] = useState([
    {
      name: 'name',
      fieldType: FIELD_TYPES.INPUT,
      label: 'Nome',
      config: {
        type: 'text',
        placeholder: 'Vasinho',
        required: true
      },
      validation: {
        required: true
      },
      submitted: false,
      valid: true,
      value: ''
    },
    {
      name: 'location',
      fieldType: FIELD_TYPES.INPUT,
      label: 'Localização',
      config: {
        type: 'text',
        placeholder: 'Garagem, Quintal, ...',
        required: true
      },
      validation: {
        required: true
      },
      submitted: false,
      valid: true,
      value: ''
    },
    {
      name: 'plantType',
      fieldType: FIELD_TYPES.SELECT,
      label: 'Tipo de plantas',
      config: {
        options: new Array<any>()
      },
      validation: {},
      submitted: false,
      valid: true,
      value: ''
    }
  ]);

  const [loading, setLoading] = useState(false);
  const { userId } = useUserInfo();

  useEffect(() => {
    const newFormFields = [...formFields];
    const newField = { ...newFormFields[2] };
    const newConfig = { ...newField.config };

    axios.get('/plant-type')
      .then((response: AxiosResponse<PlantType[]>) => {
        const plantTypes = response.data;

        newConfig.options = plantTypes.map((plantType: PlantType) => {
          return {
            value: plantType.value,
            name: plantType.name
          }
        });

        newField.config = newConfig;
        newField.value = plantTypes[0].value;
        newFormFields[2] = newField;

        setFormFields(newFormFields);
      })
      .catch(() => {
        newConfig.options = [];

        newField.config = newConfig;
        newField.value = '';
        newFormFields[3] = newField;

        setFormFields(newFormFields);
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.history]);

  // TODO: Refactor para tornar submit padronizado
  const submitCreateVase = (values: { name: string, value: string }[]) => {
    setLoading(true);

    let body: { [key: string]: string } = {};
    values.forEach((value) => body[value.name] = value.value);

    axios.post(`/user/${userId}/vase`, body)
      .then(() => {
        setLoading(false);
        props.history.push('/vasos');
        toast.success('✔️ Vaso criado com sucesso!', {
          position: 'top-right',
          autoClose: 4000,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
        });
      })
      .catch((error: AxiosError) => {
        let message = '❌ Erro ao cadastrar vaso, tente novamente mais tarde';
        if (error.response) {
          console.log(error.response.data);
          message = '❌ ' + error.response.data.message;
        }
        toast.error(message, {
          position: 'top-right',
          autoClose: 4000,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
        });
        setLoading(false);
      });
  }

  const form = (
    <Form
      fields={formFields}
      setFields={setFormFields}
      className={classes.NewVaseFormContainer}
      onSubmit={submitCreateVase}
    >
      {(setValue: Function) => {
        return (
          <>
            {formFields.map(field =>
              <Field key={field.name} field={field} onChange={(event: any) => setValue(field.name, event.target.value)} />
            )}

            <div className={classes.FormButtons}>
              <Button
                btnStyle='secondary'
                type='button'
                disabled={loading}
                onClick={() => props.history.push('/vases')}>
                Cancelar
              </Button>
              <Button
                btnStyle='primary'
                type='submit'
                loading={loading}
                disabled={loading}>
                Cadastrar
              </Button>
            </div>
          </>
        );
      }}
    </Form>
  );

  return (
    <div className={classes.NewVaseContainer}>
      <h1 className={classes.PageTitle}>Novo Vaso</h1>
      {form}
    </div>
  )
}

export default CreateVase;
