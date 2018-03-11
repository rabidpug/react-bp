import { Layout, } from 'antd';
import React from 'react';
import { Switch, } from 'react-router-dom';
import actionMenu from '../../routes/actionMenu';
import content from '../../routes/content';
import { hot, } from 'react-hot-loader';
import navMenu from '../../routes/navMenu';
import { renderRoutes, } from 'react-router-config';
import styles from './styles.scss';

const { Content, } = Layout;

const App = () => (
  <Layout className={ styles.layoutStyle }>
    {renderRoutes( navMenu )}
    <Layout>
      <Switch>{renderRoutes( actionMenu )}</Switch>
      <Content className={ styles.bodyStyle }>{renderRoutes( content )}</Content>
    </Layout>
  </Layout>
);

export default hot( module )( App );
