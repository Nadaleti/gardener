import React, { useState, FormEvent } from 'react';

import { FiXCircle } from 'react-icons/fi';

import Input from '../../components/Form/Input';
import Button from '../../components/Button';
import { Link } from 'react-router-dom';
import axios from '../../axios';

import classes from './Login.module.scss';

const Login = (props: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState(false);

  const onSubmitLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    axios.post('/auth/login', { email, password })
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
    <form className={classes.LoginFormContainer} onSubmit={onSubmitLogin}>
      <h1>Login</h1>
      <Input type='email'
        label='E-mail'
        placeholder='gardener@email.com'
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        required />
      <Input type='password'
        label='Senha'
        placeholder='Digite sua senha'
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        required />
      {loginError ?
        <p className={classes.ErrorMessage}>
          <FiXCircle className={classes.Icon} /> E-mail ou senha incorretos
        </p>:
      null}
      <Button btnStyle='primary' loading={loading} disabled={loading}>Entrar</Button>
      <p className={classes.Signup}>Não tem cadastro? <Link to='/cadastro'>Cadastre-se</Link></p>
    </form>
  )
}

export default Login;