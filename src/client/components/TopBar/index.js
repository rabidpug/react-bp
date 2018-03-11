import {
  Icon,
  Layout,
  Menu,
} from 'antd';

import React from 'react';
import styles from './styles.scss';

const { Item, } = Menu;

const { Header, } = Layout;
const TopBar = ( {
  isSidebarCollapsed, toggleSideBar, actionMenuItems,
} ) => (
  <Header
    style={ { background : '#fff',
              padding    : 0, } }>
    <Icon
      className={ styles.trigger }
      onClick={ toggleSideBar }
      type={ isSidebarCollapsed ? 'menu-unfold' : 'menu-fold' } />
    {actionMenuItems && (
      <Menu
        className={ styles.topBarMenu }
        mode='horizontal'
        onClick={ ( { item, } ) => item.props.action() }
        selectedKeys={ [] }>
        {actionMenuItems.map( item => (
          <Item
            action={ item.action }
            key={ item.key }>
            <Icon type={ item.icon } />
            {item.label}
          </Item>
        ) )}
      </Menu>
    )}
  </Header>
);

export default TopBar;
