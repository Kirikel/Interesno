import React, { FC } from 'react';
import styles from './header.module.css';
import { NavLink } from 'react-router-dom';

interface Props {}

export const Header: FC<Props> = () => {
  return (
    <header className={styles.header}>
      <NavLink to='/' className={styles.logo}>
        <img
          src={require('../../assets/images/logo.png')}
          alt='logo'
          className={styles.logoImage}
        />
        <span className={styles.title}>Books</span>
      </NavLink>
      <NavLink to='/book/add' className={styles.link}>
        Добавить новую книгу
      </NavLink>
    </header>
  );
};
