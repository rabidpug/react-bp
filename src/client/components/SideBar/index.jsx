import { Icon, Layout, Menu, } from 'antd';
import React, { Component, } from 'react';

import SlideWrap from 'Animations/SlideWrap';
import { connect, } from 'react-redux';
import mapSideBar from './map';

const { Item, SubMenu, } = Menu;
const { Sider, } = Layout;

@connect( mapSideBar.State, mapSideBar.Dispatch )
@SlideWrap
export default class SideBar extends Component {
  render () {
    const {
      isSidebarCollapsed,
      menuItems,
      goToPath,
      toggleSideBar,
      currentPath,
      toggleKey,
      openKeys,
      isAuthenticated,
      style,
    } = this.props;
    const selectedKeys = [];
    const openSelectedKeys = [ ...openKeys, ];
    const determineIfOpen = item => {
      if ( currentPath.indexOf( item.path ) === 0 && item.path.length >= currentPath.length - 1 ) {
        if ( item.subMenu ) {
          openSelectedKeys.push( item.key );

          item.subMenu.forEach( determineIfOpen );
        } else selectedKeys.push( item.key );
      }
    };

    menuItems.forEach( determineIfOpen );

    const filterAuth = item => typeof item.isAuthenticated !== 'boolean' || item.isAuthenticated === !!isAuthenticated;
    const menuItemMap = item =>
      item.subMenu ? (
        <SubMenu
          key={ item.key }
          onTitleClick={ ( { key, } ) => toggleKey( key ) }
          title={
            <span>
              <Icon type={ item.icon } />
              <span>{item.label}</span>
            </span>
          }>
          {item.subMenu.filter( filterAuth ).map( menuItemMap )}
        </SubMenu>
      ) : (
        <Item
          key={ item.key }
          onMouseEnter={ () => item.component.preload() }
          path={ item.path }>
          <Icon type={ item.icon } />
          <span>{item.label}</span>
        </Item>
      );

    return (
      <Sider
        collapsed={ isSidebarCollapsed }
        collapsible
        onMouseEnter={ () => isSidebarCollapsed && toggleSideBar() }
        onMouseLeave={ () => !isSidebarCollapsed && toggleSideBar() }
        style={ {
          ...style,
          backgroundColor: '#fff',
        } }
        trigger={ null }>
        <div className='logo' />
        <Menu
          mode='inline'
          onClick={ ( { item, } ) => goToPath( item.props.path ) }
          openKeys={ isSidebarCollapsed ? [] : openSelectedKeys }
          selectedKeys={ selectedKeys }
          style={ { height: '100%', } }
          theme='dark'>
          {menuItems.filter( filterAuth ).map( menuItemMap )}
        </Menu>
      </Sider>
    );
  }
}
