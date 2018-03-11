import HomeSideBar from '../../containers/HomeSideBar';
import HomeTopBar from '../../containers/HomeTopBar';
import { Layout, } from 'antd';
import React from 'react';
import { hot, } from 'react-hot-loader';
import { renderRoutes, } from 'react-router-config';
import routes from '../../routes';
import styles from './styles.scss';

const { Content, } = Layout;

//TODO: set up HomeTopBar container, content as routes
const App = () => (
  <Layout className={ styles.layoutStyle }>
    <HomeSideBar />
    <Layout>
      <HomeTopBar />
      <Content className={ styles.bodyStyle }>{renderRoutes( routes )}</Content>
    </Layout>
  </Layout>
);

export default hot( module )( App );
