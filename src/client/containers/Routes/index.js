import { Route, Switch, } from 'react-router-dom';

import Loadable from 'react-loadable';
import Loading from '../../components/Loading';
import React from 'react';

const LoadableBye = Loadable( { loader  : () => import( '../../scenes/Bye' ),
                                loading : Loading,  } );
const LoadableTodoPage = Loadable( { loader  : () => import( '../../scenes/TodoPage' ),
                                     loading : Loading,  } );

const Routes = () => (
  <Switch>
    <Route
      path='/welcome'
      render={ () => ( <div>
        {'Well then'}
      </div> ) } />
    <Route
      path='/bye'
      render={ () => <LoadableBye /> } />
    <Route
      path='/todo'
      render={ () => <LoadableTodoPage /> } />
  </Switch>
);

export default Routes;
