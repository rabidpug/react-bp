import HelloButton from '../../containers/HelloButton';
import Menu from '../../containers/Menu';
import Message from '../../containers/Message';
import React from 'react';
import Routes from '../../containers/Routes';
import { hot, } from 'react-hot-loader';
import styles from './styles.scss';

const App = () => (
  <div className={ styles.bodyStyle }>
    <Menu />
    <Message />
    <HelloButton />
    <Routes />
  </div>
);

export default hot( module )( App );
