import {
  Icon,
  Layout,
  Menu,
} from 'antd';

import React from 'react';

const { Item, } = Menu;
const { Sider, } = Layout;

const Sidebar = ( {
  isSidebarCollapsed, menuItems, goToPath,
} ) => (
  <Sider
    collapsed={ isSidebarCollapsed }
    collapsible
    trigger={ null }>
    <div className='logo' />
    <Menu
      defaultSelectedKeys={ [ '1', ] }
      mode='inline'
      onClick={({ item }) => goToPath(item.props.path)} //eslint-disable-line
      style={ { height: '100%', } }
      theme='light'>
      {menuItems.map( item => (
        <Item
          key={ item.key }
          path={ item.path }>
          <Icon type={ item.icon } />
          <span style={ { display: isSidebarCollapsed ? 'none' : '', } }>{item.label}</span>
        </Item>
      ) )}
    </Menu>
  </Sider>
);

export default Sidebar;
