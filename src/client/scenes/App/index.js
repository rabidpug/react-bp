import { Icon, Layout, } from 'antd';

import HelloButton from '../../containers/HelloButton';
import HomeSideBar from '../../containers/HomeSideBar';
import Message from '../../containers/Message';
import React from 'react';
import Routes from '../../containers/Routes';
import { hot, } from 'react-hot-loader';

const { Header, Content, } = Layout;
const isSidebarCollapsed = false;
//TODO: set up HomeTopBar container, content as routes
const App = () => (
  <Layout>
    <HomeSideBar />
    <Layout>
      <Header
        style={ { background : '#fff',
                  padding    : 0, } }>
        <Icon
          className='trigger'
          onClick={ () => null }
          type={ isSidebarCollapsed ? 'menu-unfold' : 'menu-fold' } />
      </Header>
      <Content
        style={ {
          background : 'whitesmoke',
          margin     : '24px 16px',
          minHeight  : 280,
          padding    : 24,
        } }>
        <Message />
        <HelloButton />
        <Routes />
      </Content>
    </Layout>
  </Layout>
);

export default hot( module )( App );
