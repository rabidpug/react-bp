import { CSSTransition, TransitionGroup, } from 'react-transition-group';
import React, { Component, } from 'react';
import { Switch, withRouter, } from 'react-router-dom';

import Layout from 'Components/Layout';
import actionMenu from 'Routes/actionMenu';
import { connect, } from 'react-redux';
import content from 'Routes/content';
import fadeTransition from 'Styles/fadeTransition';
import { hot, } from 'react-hot-loader';
import map from './map';
import navMenu from 'Routes/navMenu';
import { renderRoutes, } from 'react-router-config';
import { subscribePush, } from 'Client/webpush';

@hot( module )
@withRouter
@connect( map.State, map.Dispatch )
export default class App extends Component {
  componentDidMount () {
    const { isOnline, linkAuth, authSuccess, isGettingProfile, getProfile, } = this.props;

    isOnline( window.navigator.onLine );

    const newToken = localStorage.getItem( 'tempToken' );
    const newRefreshToken = localStorage.getItem( 'tempRefreshToken' );
    const profile = localStorage.getItem( 'profile' );
    const currentToken = localStorage.getItem( 'JWT' ) || sessionStorage.getItem( 'JWT' );

    if ( currentToken && newToken ) linkAuth( newToken );
    else if ( newToken ) {
      localStorage.removeItem( 'tempToken' );

      localStorage.removeItem( 'tempRefreshToken' );

      localStorage.removeItem( 'profile' );

      authSuccess( {
        profile      : profile && JSON.parse( profile ),
        refreshToken : newRefreshToken,
        token        : newToken,
      } );
    } else if ( currentToken && !isGettingProfile ) getProfile();
  }

  componentDidUpdate () {
    const currentToken = localStorage.getItem( 'JWT' ) || sessionStorage.getItem( 'JWT' );
    const { pushSubscription, } = this.props;

    if ( currentToken && !pushSubscription && Notification.permission !== 'denied' ) subscribePush();
  }

  render () {
    const { location, } = this.props;

    const currentKey = location.pathname.split( '/' )[1] || '/';
    const timeout = {
      enter : 300,
      exit  : 200,
    };

    return (
      <Layout parent>
        {renderRoutes( navMenu )}
        <Layout>
          {renderRoutes( actionMenu )}
          <TransitionGroup component={ Layout.Content }>
            <CSSTransition
              classNames={ fadeTransition }
              key={ currentKey }
              timeout={ timeout }>
              <Switch location={ location }>{renderRoutes( content )}</Switch>
            </CSSTransition>
          </TransitionGroup>
        </Layout>
      </Layout>
    );
  }
}
