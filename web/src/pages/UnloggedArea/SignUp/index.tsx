import React, { useState, useEffect } from 'react';

import Button from '../../../components/Button';
import Input from '../../../components/Form/Input';
import FormLine from '../../../components/Form/FormLine';
import Select from '../../../components/Form/Select';

import classes from './SignUp.module.scss';
import UnloggedAreaLayout from '..';

const SignUp = (props: any) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      props.history.push('/');
    }
  }, []);

  return (
    <UnloggedAreaLayout>
      <form className={classes.SignUpFormContainer}>
        <h1>Cadastro</h1>
        <Input label='Nome Completo' type='text' />
        {/* TODO: Radio button */}
        <Input label='Gênero' type='text' />
        {/* TODO: Select */}
        {/* TODO: Carregar dados api do IBGE */}
        <FormLine>
          <Select label='Estado' required />
          <Select label='Cidade' required />
        </FormLine>
        <Input label='E-mail' type='email' />
        <FormLine>
          <Input label='Senha' type='password' />
          <Input label='Confirmação de Senha' type='password' />
        </FormLine>
        <div className={classes.FormButtons}>
          <Button btnStyle='secondary'>Cancelar</Button>
          <Button btnStyle='primary' loading={loading} disabled={loading}>Cadastrar</Button>
        </div>
      </form>
    </UnloggedAreaLayout>
  )
}

export default SignUp;
