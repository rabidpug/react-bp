import React from 'react';
import logo from 'Assets/logo.svg';
import styles from './Bye.scss';

const Bye = () => (
  <div className={ styles.bye }>
    <img src={ logo } />
    {'Bye'}
  </div>
);

export default Bye;
