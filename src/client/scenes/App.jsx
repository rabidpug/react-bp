import { CSSTransition, TransitionGroup, } from 'react-transition-group';
import React, { Component, } from 'react';
import { Switch, withRouter, } from 'react-router-dom';
import { linkAuth, redirectedAuthSuccess, } from 'Store/user/actions';

import { Layout, } from 'antd';
import actionMenu from 'Routes/actionMenu';
import { connect, } from 'react-redux';
import content from 'Routes/content';
import fadeTransition from 'Styles/fadeTransition';
import { hot, } from 'react-hot-loader';
import { isOnline, } from 'Store/ui/actions';
import navMenu from 'Routes/navMenu';
import { renderRoutes, } from 'react-router-config';
import styles from 'Styles/App';

const { Content, } = Layout;
const mapDispatchToProps = {
  isOnline,
  linkAuth,
  redirectedAuthSuccess,
};

@connect(
  null, mapDispatchToProps
)
class AppRaw extends Component {
  componentDidMount () {
    const {
      isOnline, linkAuth, redirectedAuthSuccess,
    } = this.props;

    isOnline( window.navigator.onLine );

    const newToken = localStorage.getItem( 'tempToken' );
    const profile = localStorage.getItem( 'profile' );
    const currentToken = localStorage.getItem( 'JWT' );

    if ( currentToken && newToken ) {
      linkAuth(
        currentToken, newToken
      );
    } else if ( newToken ) {
      redirectedAuthSuccess( { profile : profile && JSON.parse( profile ),
                               token   : newToken, } );

      localStorage.removeItem( 'tempToken' );

      localStorage.removeItem( 'profile' );
    }
  }

  render () {
    const { location, } = this.props;

    const currentKey = location.pathname.split( '/' )[1] || '/';
    const timeout = { enter : 300,
                      exit  : 200, };

    return (
      <Layout className={ styles.layoutStyle }>
        {renderRoutes( navMenu )}
        <Layout>
          {renderRoutes( actionMenu )}
          <Content className={ styles.bodyStyle }>
            <TransitionGroup>
              <CSSTransition
                classNames={ fadeTransition }
                key={ currentKey }
                timeout={ timeout }>
                <div className={ styles.contentStyle }>
                  <Switch location={ location }>{renderRoutes( content )}</Switch>
                </div>
              </CSSTransition>
            </TransitionGroup>
          </Content>
        </Layout>
      </Layout>
    );
  }
}
const App = withRouter( AppRaw );

export default hot( module )( App );
