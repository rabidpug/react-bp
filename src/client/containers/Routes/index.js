import { Route, Switch, } from 'react-router-dom';

import Loadable from 'react-loadable';
import Loading from '../../components/Loading';
import React from 'react';

const LoadableComponent = Loadable( { loader  : () => import( '../../components/Bye' ),
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
      render={ () => <LoadableComponent /> } />
  </Switch>
);

export default Routes;
