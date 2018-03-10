import {
  Icon,
  Layout,
  Menu,
} from 'antd';

import React from 'react';

const { Item, } = Menu;
const { Sider, } = Layout;
const Sidebar = ( {
  isSidebarCollapsed, menuItems, goToPath, toggleSideBar, router,
} ) => {
  const [ currentPath, ] = menuItems.filter( item => item.path === router.location.pathname );

  return (
    <Sider
      collapsed={ isSidebarCollapsed }
      collapsible
      onMouseEnter={ () => isSidebarCollapsed && toggleSideBar() }
      onMouseLeave={ () => !isSidebarCollapsed && toggleSideBar() }
      trigger={ null }>
      <div className='logo' />
      <Menu
        defaultSelectedKeys={ [ currentPath ? currentPath.key.toString() : '1', ] }
        mode='inline'
        onClick={ ( { item, } ) => goToPath( item.props.path ) }
        style={ { height: '100%', } }
        theme='dark'>
        {menuItems.map( item => (
          <Item
            key={ item.key }
            path={ item.path }>
            <Icon type={ item.icon } />
            <span>{item.label}</span>
          </Item>
        ) )}
      </Menu>
    </Sider>
  );
};

export default Sidebar;
