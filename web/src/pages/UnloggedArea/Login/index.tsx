import React, { useState, useEffect } from 'react';

import { FiXCircle } from 'react-icons/fi';
import md5 from 'md5';

import Button from '../../../components/Button';
import Form from '../../../components/Form';
import { FIELD_TYPES } from '../../../components/Form/FieldTypes.enum';
import Field from '../../../components/Form/Field';
import { Link } from 'react-router-dom';
import UnloggedAreaLayout from '..';
import axios from '../../../axios';

import classes from './Login.module.scss';

const Login = (props: any) => {
  const [formFields, setFormFields] = useState([
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
        isEmail: true,
        required: true
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
        required: true
      },
      validation: {
        required: true
      },
      submitted: false,
      valid: true,
      value: ''
    },
  ]);

  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      props.history.push('/');
    }
  }, [props.history]);

  const onSubmitLogin = (values: []) => {
    setLoading(true);

    const loginBody: { [key: string]: string } = {};
    values.forEach((value: any) => loginBody[value.name] = value.value);
    loginBody.password = md5(loginBody.password);

    axios.post('/auth/login', loginBody)
      .then((loginResponse) => {
        setLoading(false);
        localStorage.setItem('token', loginResponse.data.token);
        props.history.push('/');
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        setLoginError(true);
      });
  }

  return (
    <UnloggedAreaLayout>
      <Form
        fields={formFields}
        setFields={setFormFields}
        className={classes.LoginFormContainer}
        onSubmit={onSubmitLogin}
      >
        {(setValue: Function) => {
          return (
            <>
              <h1>Login</h1>
              <div className={classes.FormContainer}>
                {formFields.map((field: any) =>
                  <Field key={field.name} field={field} onChange={(event: any) => setValue(field.name, event.target.value)} />)}
                {loginError ?
                  <p className={classes.ErrorMessage}><FiXCircle className={classes.Icon} /> E-mail ou senha incorretos</p> :
                  null}
              </div>
              <Button btnStyle='primary' loading={loading} disabled={loading}>Entrar</Button>
              <p className={classes.Signup}>Não tem cadastro? <Link to='/cadastro'>Cadastre-se</Link></p>
            </>
          );
        }}

      </Form>
    </UnloggedAreaLayout>
  )
}

export default Login;
