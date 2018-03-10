import { Icon, Layout, } from 'antd';

import HomeSideBar from '../../containers/HomeSideBar';
import React from 'react';
import { hot, } from 'react-hot-loader';
import { renderRoutes, } from 'react-router-config';
import routes from '../../routes';
import styles from './styles.scss';

const { Header, Content, } = Layout;
const isSidebarCollapsed = false;

//TODO: set up HomeTopBar container, content as routes
const App = () => (
  <Layout
    style={ { height   : '100vh',
              overflow : 'hidden', } }>
    <HomeSideBar />
    <Layout>
      <Header
        style={ { background : '#fff',
                  padding    : 0, } }>
        <Icon
          className={ styles.trigger }
          onClick={ () => null }
          type={ isSidebarCollapsed ? 'menu-unfold' : 'menu-fold' } />
      </Header>
      <Content className={ styles.bodyStyle }>{renderRoutes( routes )}</Content>
    </Layout>
  </Layout>
);

export default hot( module )( App );
