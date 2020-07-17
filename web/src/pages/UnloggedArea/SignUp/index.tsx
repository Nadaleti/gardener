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

const DEFAULT_OPTION_VALUE = 'default';

const SignUp = (props: any) => {
  const [ufs, setUfs] = useState<UF[]>([]);
  const [selectedUf, setSelectedUf] = useState<string>(DEFAULT_OPTION_VALUE);
  const [cities, setCities] = useState<string[]>([]);
  const [selectedCity, setSelectedCity] = useState<string>(DEFAULT_OPTION_VALUE);
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
    if (selectedUf !== DEFAULT_OPTION_VALUE) {
      axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`)
        .then((response) => {
          const cities = response.data.map((city: any) => city.nome).sort();
          setCities(cities);
        })
        .catch((error) => console.log(error));
    }
  }, [selectedUf]);

  const selectUfHandler = (uf: string) => {
    setSelectedUf(uf);
    setSelectedCity(DEFAULT_OPTION_VALUE);
    setCities([]);
  }

  return (
    <UnloggedAreaLayout>
      <form className={classes.SignUpFormContainer}>
        <h1>Cadastro</h1>
        <Input label='Nome Completo' type='text' />
        {/* TODO: Radio button */}
        <Input label='Gênero' type='text' />
        <FormLine>
          <Select
            label='Estado'
            defaultOptionValue={DEFAULT_OPTION_VALUE}
            defaultOptionText='Escolha seu estado'
            onChange={(event) => selectUfHandler(event.target.value)}
            value={selectedUf}
            required
          >
            {ufs.map((uf) => <option key={uf.uf} value={uf.uf}>{uf.name}</option>)}
          </Select>
          <Select
            label='Cidade'
            defaultOptionValue={DEFAULT_OPTION_VALUE}
            defaultOptionText='Escolha sua cidade'
            onChange={(event) => setSelectedCity(event.target.value)}
            value={selectedCity}
            disabled={selectedUf === DEFAULT_OPTION_VALUE}
            required
          >
            {cities.map((city) => <option key={city} value={city}>{city}</option>)}
          </Select>
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
