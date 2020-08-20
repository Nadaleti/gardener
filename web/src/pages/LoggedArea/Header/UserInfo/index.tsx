import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ConnectedProps, connect } from 'react-redux';
import { AxiosResponse, AxiosError } from 'axios';

import GardenerFemale from '../../../../assets/gardener-f.svg';
import GardenerMale from '../../../../assets/gardener-m.svg';

import { logoutAction, addUserInfoAction } from '../../../../store/reducers/session';
import useUserInfo from '../../../../hooks/useUserInfo';
import axios from '../../../../axios';

import classes from './UserInfo.module.scss';

interface UserInfo {
  name: string;
  email: string;
  gender: string;
  uf: string;
  city: string;
}

const mapStateToProps = (state: any) => {
  return {
    userName: state.name,
    userGender: state.gender
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    loadUserInfo: (userInfo: UserInfo) => dispatch(addUserInfoAction({name: userInfo.name, gender: userInfo.gender})),
    logout: () => dispatch(logoutAction())
  }
}

const connector = connect(mapStateToProps, mapDispatchToProps);

type UserInfoProps = ConnectedProps<typeof connector>;

const UserInfo = (props: UserInfoProps) => {
  const {userId} = useUserInfo();

  useEffect(() => {
    axios.get(`/user/${userId}`)
      .then((response: AxiosResponse<UserInfo>) => {
        props.loadUserInfo(response.data);
      })
      .catch((error: AxiosError) => {
        if (error.response) console.log(error.response.data);
        else console.log(error);
      });
  }, [userId, props]);

  return (
    <div className={classes.UserMenu}>
      <div className={classes.UserInfo}>
        <img src={props.userGender === 'MALE' ? GardenerMale : GardenerFemale} alt='user' />
        <span className={classes.UserInfoItem}>{`Olá, ${props.userName.split(' ')[0]}`}</span>
      </div>
      <ul className={classes.Menu}>
        <li className={classes.MenuItem}>
          <Link to='/'>Dados pessoais</Link>
        </li>
        <li className={classes.MenuItem}>
          <Link to='/' onClick={props.logout}>Sair</Link>
        </li>
      </ul>
    </div>
  )
}

export default connector(UserInfo);
