import React, { useState, useEffect } from 'react';

import Button from '../../../components/Button';
import Input from '../../../components/Form/Input';
import FormLine from '../../../components/Form/FormLine';
import Select from '../../../components/Form/Select';
import UnloggedAreaLayout from '..';
import axios from '../../../axios';

import classes from './SignUp.module.scss';

interface UF {
  uf: string;
  name: string;
}

const DEFAULT_OPTION_VALUE = '';

const SignUp = (props: any) => {
  const [ufs, setUfs] = useState<UF[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [isPasswordValid, setPasswordValid] = useState(true);
  const [isPasswordEqual, setPasswordEqual] = useState(true);

  const [signupData, setSignupData] = useState({
    name: '',
    gender: '',
    selectedUf: DEFAULT_OPTION_VALUE,
    selectedCity: DEFAULT_OPTION_VALUE,
    email: '',
    password: ''
  });

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
        })
        setUfs(ufs);
      })
      .catch((error) => console.log(error));
  }, [props.history]);

  useEffect(() => {
    if (signupData.selectedUf !== DEFAULT_OPTION_VALUE) {
      axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${signupData.selectedUf}/municipios`)
        .then((response) => {
          const cities = response.data.map((city: any) => city.nome).sort();
          setCities(cities);
        })
        .catch((error) => console.log(error));
    }
  }, [signupData.selectedUf]);

  const selectUfHandler = (uf: string) => {
    setSignupData({
      ...signupData,
      selectedUf: uf,
      selectedCity: DEFAULT_OPTION_VALUE
    });
    setCities([]);
  }

  const passwordChangeHandler = (value: string) => {
    setSignupDataValue(value, 'password');
    verifyPasswordValidity(value);
    verifyPasswordEquality(value, passwordConfirmation);
  }

  const passwordConfirmationChangeHandler = (value: string) => {
    setPasswordConfirmation(value);
    verifyPasswordEquality(signupData.password, value);
  }
  
  const setSignupDataValue = (value: any, field: string) => {
    setSignupData({...signupData, [field]: value});
  }

  const verifyPasswordEquality = (password: string, passwordConfirmation: string) => {
    setPasswordEqual(passwordConfirmation === '' || password === passwordConfirmation);
  }

  const verifyPasswordValidity = (password: string) => {
    setPasswordValid(password.length >= 8);
  }

  const getErrorMessage = () => {
    let errorMessage = '';
    if (!isPasswordValid) errorMessage = '* A senha deve ter no mínimo 8 caracteres';
    else if (!isPasswordEqual) errorMessage = '* A senha e a confirmação de senha devem ser iguais';
    else return null;

    return <p className={classes.PasswordErrorMessage}>{errorMessage}</p>;
  }

  return (
    <UnloggedAreaLayout>
      <form className={classes.SignUpFormContainer}>
        <h1>Cadastro</h1>
        <Input
          label='Nome Completo'
          type='text'
          placeholder='Margarida Flores'
          required
          onChange={(event) => setSignupDataValue(event.target.value, 'name')} />
        {/* TODO: Radio button */}
        <Input label='Gênero' type='text' />
        <FormLine>
          <Select
            label='Estado'
            defaultOptionValue={DEFAULT_OPTION_VALUE}
            defaultOptionText='Escolha seu estado'
            onChange={(event) => selectUfHandler(event.target.value)}
            value={signupData.selectedUf}
            required
          >
            {ufs.map((uf) => <option key={uf.uf} value={uf.uf}>{uf.name}</option>)}
          </Select>
          <Select
            label='Cidade'
            defaultOptionValue={DEFAULT_OPTION_VALUE}
            defaultOptionText='Escolha sua cidade'
            onChange={(event) => setSignupDataValue(event.target.value, 'selectedCity')}
            value={signupData.selectedCity}
            disabled={signupData.selectedUf === DEFAULT_OPTION_VALUE}
            required
          >
            {cities.map((city) => <option key={city} value={city}>{city}</option>)}
          </Select>
        </FormLine>
        <Input
          label='E-mail'
          type='email'
          placeholder='gardener@email.com'
          required
          onChange={(event) => setSignupDataValue(event.target.value, 'email')} />
        <FormLine>
          <Input
            label='Senha'
            type='password'
            placeholder='Digite sua senha'
            hasError={!isPasswordValid || !isPasswordEqual}
            required
            onChange={(event) => passwordChangeHandler(event.target.value)} />
          <Input
            label='Confirmação de Senha'
            type='password'
            placeholder='Digite a mesma senha'
            hasError={!isPasswordEqual}
            required
            onChange={(event) => passwordConfirmationChangeHandler(event.target.value)} />
        </FormLine>
        {getErrorMessage()}
        <div className={classes.FormButtons}>
          <Button btnStyle='secondary' type='button'>Cancelar</Button>
          <Button btnStyle='primary' type='submit' loading={loading} disabled={loading}>Cadastrar</Button>
        </div>
      </form>
    </UnloggedAreaLayout>
  )
}

export default SignUp;
