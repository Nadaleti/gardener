import React from 'react';
import { Link } from 'react-router-dom';

import GardenerMale from '../../../../assets/gardener-m.svg';

import classes from './UserInfo.module.scss';

const UserInfo = () => {
  return (
    <div className={classes.UserMenu}>
      <div className={classes.UserInfo}>
        <img src={GardenerMale} alt='user' />
        <span className={classes.UserInfoItem}>Username</span>
      </div>
      <ul className={classes.Menu}>
        <li className={classes.MenuItem}>
          <Link to='/'>Dados pessoais</Link>
        </li>
        <li className={classes.MenuItem}>
          <Link to='/'>Sair</Link>
        </li>
      </ul>
    </div>
  )
}

export default UserInfo;
