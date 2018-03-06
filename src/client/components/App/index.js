import HelloButton from '../../containers/HelloButton';
import Menu from '../Menu';
import Message from '../../containers/Message';
import React from 'react';
import Routes from '../../containers/Routes';
import styles from './styles.scss';

const App = () => (
  <div className={ styles.body }>
    <Menu />
    <Message />
    <HelloButton />
    <Routes />
  </div>
);

export default App;
