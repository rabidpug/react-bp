import {
  Route,
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom';

import Bye from '../Bye';
import Menu from '../Menu';
import React from 'react';
import { hot, } from 'react-hot-loader';
import styles from './styles.scss';

const App = () => (
  <Router>
    <div className={ styles.body }>
      <Menu />
      <Switch>
        <Route
          path='/welcome'
          render={ () => ( <div>
            {'Well then'}
          </div> ) } />
        <Route
          path='/bye'
          render={ () => <Bye /> } />
      </Switch>
    </div>
  </Router>
);

export default hot( module )( App );
