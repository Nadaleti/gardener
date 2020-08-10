import React, { useState, useEffect } from 'react';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import md5 from 'md5';

import axios from '../../../axios';
import Button from '../../../components/Button';
import { FIELD_TYPES } from '../../../components/Form/FieldTypes.enum';
import Field from '../../../components/Form/Field';
import Form from '../../../components/Form';
import FormLine from '../../../components/Form/FormLine';
import UnloggedAreaLayout from '..';

import classes from './SignUp.module.scss';
import { AxiosError } from 'axios';

interface UF {
  uf: string;
  name: string;
}

const DEFAULT_OPTION_VALUE = '';

const SignUp = (props: any) => {
  const [formFields, setFormFields] = useState([
    {
      name: 'name',
      fieldType: FIELD_TYPES.INPUT,
      label: 'Nome Completo',
      config: {
        type: 'text',
        placeholder: 'Margarida Flores',
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
      name: 'gender',
      fieldType: FIELD_TYPES.RADIO,
      label: 'Sexo',
      config: {
        options: [
          {
            name: 'Masculino',
            value: 'MALE'
          },
          {
            name: 'Feminino',
            value: 'FEMALE'
          }
        ],
        type: 'text',
        required: true
      },
      submitted: true,
      validation: {},
      valid: true,
      value: 'MALE'
    },
    {
      name: 'uf',
      fieldType: FIELD_TYPES.SELECT,
      label: 'Estado',
      config: {
        options: [],
        defaultOptionValue: DEFAULT_OPTION_VALUE,
        defaultOptionText: 'Selecione seu estado',
        required: true,
        disabled: true
      },
      validation: {
        required: true
      },
      submitted: false,
      valid: true,
      value: DEFAULT_OPTION_VALUE
    },
    {
      name: 'city',
      fieldType: FIELD_TYPES.SELECT,
      label: 'Cidade',
      config: {
        options: [],
        defaultOptionValue: DEFAULT_OPTION_VALUE,
        defaultOptionText: 'Selecione sua cidade',
        required: true,
        disabled: true
      },
      validation: {
        required: true
      },
      submitted: false,
      valid: true,
      value: ''
    },
    {
      name: 'email',
      fieldType: FIELD_TYPES.INPUT,
      label: 'E-mail',
      config: {
        type: 'email',
        placeholder: 'gardener@email.com',
        required: true
      },
      validation: {
        required: true,
        isEmail: true
      },
      submitted: false,
      valid: true,
      value: ''
    },
    {
      name: 'password',
      fieldType: FIELD_TYPES.INPUT,
      label: 'Senha',
      config: {
        type: 'password',
        placeholder: 'Digite sua senha',
        minLength: 8,
        required: true
      },
      validation: {
        minLength: 8,
        required: true
      },
      submitted: false,
      valid: true,
      value: ''
    }
  ]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      props.history.push('/');
    }

    axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
      .then((response) => {
        const ufs = response.data.map((uf: any) => { return { uf: uf.sigla, name: uf.nome } });
        ufs.sort((a: any, b: any) => {
          let textA = a.name.toUpperCase();
          let textB = b.name.toUpperCase();
          return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        });

        const newFormFields = [...formFields];
        const newField = { ...newFormFields[2] };
        const newConfig = { ...newField.config };

        newConfig.options = ufs.map((uf: UF) => { return { value: uf.uf, name: uf.name } });
        newConfig.disabled = ufs.length === 0;

        newField.config = newConfig;
        newFormFields[2] = newField;

        setFormFields(newFormFields);
      })
      .catch((error) => console.log(error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.history]);

  const selectedUf = formFields[2].value;

  useEffect(() => {
    const newFormFields = [...formFields];
    const newField = { ...newFormFields[3] };
    const newConfig = { ...newField.config };
    newField.value = DEFAULT_OPTION_VALUE;

    if (selectedUf !== DEFAULT_OPTION_VALUE) {
      axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`)
        .then((response) => {
          const cities = response.data.map((city: any) => city.nome).sort();

          newConfig.options = cities.map((city: string) => { return { value: city, name: city } });
          newConfig.disabled = cities.length === 0;

          newField.config = newConfig;
          newFormFields[3] = newField;

          setFormFields(newFormFields);
        })
        .catch((error) => console.log(error));
    } else {
      newConfig.options = [];
      newConfig.disabled = true;

      newField.config = newConfig;
      newFormFields[3] = newField;

      setFormFields(newFormFields);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedUf]);

  const submitSignup = (values: {name: string, value: string}[]) => {
    setLoading(true);

    let body: {[key: string]: string} = {};
    values.forEach((value) => body[value.name] = value.value);
    body.password = md5(body.password);

    axios.post('/auth/register', body)
      .then(() => {
        setLoading(false);
        props.history.push('/login');
        toast.success('✔️ Cadastro realizado com sucesso!', {
          position: 'top-right',
          autoClose: 4000,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
        });
      })
      .catch((error: AxiosError) => {
        let message = '❌ Erro ao realizar cadastro, tente novamente mais tarde';
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

  return (
    <UnloggedAreaLayout>
      <Form
        fields={formFields}
        setFields={setFormFields}
        className={classes.SignUpFormContainer}
        onSubmit={submitSignup}
      >
        {(setValue: Function) => {
          return (
            <>
              <h1>Cadastro</h1>
              <Field field={formFields[0]} onChange={(event: any) => setValue(formFields[0].name, event.target.value)} />
              <Field field={formFields[1]} onChange={(value: string) => setValue(formFields[1].name, value)} />
              <FormLine>
                {formFields.slice(2, 4).map((field: any) =>
                  <Field key={field.name} field={field} onChange={(event: any) => setValue(field.name, event.target.value)} />)}
              </FormLine>
              {formFields.slice(4, 6).map((field: any) =>
                <Field key={field.name} field={field} onChange={(event: any) => setValue(field.name, event.target.value)} />)}

              <div className={classes.FormButtons}>
                <Button
                  btnStyle='secondary'
                  type='button'
                  disabled={loading}
                  onClick={() => props.history.push('/login')}>
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
          )
        }}
      </Form>
    </UnloggedAreaLayout>
  )
}

export default SignUp;