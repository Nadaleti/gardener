import React from 'react';

import UserInfo from './UserInfo';
import Rake from '../../../assets/rake.svg'

import classes from './Header.module.scss';

const Header = () => {
  return (
    <header className={classes.Header}>
      <img className={classes.Logo} src={Rake} alt='Rake logo' />
      <UserInfo />
    </header>
  )
}

export default Header;
