import React, { useState, FormEvent } from 'react';

import Input from '../../components/Form/Input';
import Button from '../../components/Button';
import { Link } from 'react-router-dom';
import axios from '../../axios';

import classes from './Login.module.scss';

const Login = (props: any) => {
  const [email, setEmailState] = useState('');
  const [password, setPasswordState] = useState('');
  const [loading, setLoadingState] = useState(false);

  const onSubmitLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoadingState(true);

    axios.post('/auth/login', {email, password})
      .then((loginResponse) => {
        setLoadingState(false);
        localStorage.setItem('token', loginResponse.data.token);
        props.history.push('/');
      })
      .catch(() => {
        setLoadingState(false);
        //TODO: tratar o caso de erro de senha/email + inputs errados + tratar inputs faltando
        console.log('errado');
      });
  }

  const loginFormContainer =
    <form className={classes.LoginFormContainer} onSubmit={onSubmitLogin}>
      <h2>Login</h2>
      <Input type='text'
        label='E-mail'
        placeholder='gardener@email.com'
        value={email}
        onChange={(event) => setEmailState(event.target.value)} />
      <Input type='password'
        label='Senha'
        placeholder='Digite sua senha'
        value={password}
        onChange={(event) => setPasswordState(event.target.value)} />
      <Button btnStyle='primary' loading={loading}>Entrar</Button>
      <p className={classes.Signup}>Não tem cadastro? <Link to='/'>Cadastre-se</Link></p>
    </form>;

  return (
    <div className={classes.LoginPage}>
      <div className={classes.SidePanel}></div>
      <div className={classes.LoginContent}>
        {loginFormContainer}
      </div>
    </div>
  )
}

export default Login;
