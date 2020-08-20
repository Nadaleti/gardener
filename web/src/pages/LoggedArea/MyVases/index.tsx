import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import axios from '../../../axios';
import useUserInfo from '../../../hooks/useUserInfo';
import { AxiosError, AxiosResponse } from 'axios';
import PlantCard from '../../../components/PlantCard';

import classes from './MyVases.module.scss';

interface Vase {
  id: number;
  location: string;
  name: string;
  plantType: PlantType;
}

interface PlantType {
  name: string;
  iconPath: string;
}

const MyVases = (props: RouteComponentProps) => {
  const { userId } = useUserInfo();
  const [vases, setVases] = useState<Vase[]>([]);

  useEffect(() => {
    axios.get(`/user/${userId}/vase`)
      .then((response: AxiosResponse) => {
        setVases(response.data);
      })
      .catch((error: AxiosError) => {
        if (error.response) {
          console.log(error.response.data);
        } else {
          console.log(error);
        }
      });
  }, [userId]);

  return (
    <>
      <h1 className={classes.PageTitle}>Meus vasos</h1>
      <div className={classes.PlantCardList}>
        {vases.map((vase: Vase) =>
          <PlantCard key={vase.id} title={vase.name} location={vase.location} plantType={vase.plantType} />)}
      </div>
    </>
  )
}

export default MyVases;
