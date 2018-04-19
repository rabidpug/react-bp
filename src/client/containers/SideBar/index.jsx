import React, { Component, } from 'react';

import Layout from 'Components/Layout';
import Menu from 'Components/Menu';
import SlideWrap from 'Animations/SlideWrap';
import { connect, } from 'react-redux';
import mapSideBar from './map';
import mappedMenus from 'Helpers/mappedMenus';

@connect( mapSideBar.State, mapSideBar.Dispatch )
@SlideWrap
export default class SideBar extends Component {
  render () {
    const {
      isSidebarCollapsed,
      menuItems,
      push,
      toggleSidebar,
      currentPath,
      toggleKey,
      openKeys,
      isAuthenticated,
      style,
    } = this.props;
    const selectedKeys = [];
    const openSelectedKeys = [ ...openKeys, ];
    const isPathMatch = item =>
      (currentPath.indexOf(item.path) === 0 && item.path.length >= currentPath.length - 1) || item.subMenu; //eslint-disable-line
    const determineIfOpen = item => {
      if ( isPathMatch( item ) ) {
        if ( item.subMenu ) {
          item.subMenu.forEach( determineIfOpen );

          if ( item.subMenu.some( isPathMatch ) ) {
            openSelectedKeys.push( item.key );

            selectedKeys.push( item.key );
          }
        } else selectedKeys.push( item.key );
      }

      item.subMenu && item.subMenu.forEach( determineIfOpen );
    };

    menuItems.forEach( determineIfOpen );

    return (
      <Layout.SideBar
        collapsed={ isSidebarCollapsed }
        onMouseEnter={ () => isSidebarCollapsed && toggleSidebar() }
        onMouseLeave={ () => !isSidebarCollapsed && toggleSidebar() }
        style={ style }>
        <Menu
          itemAction={ push }
          openKeys={ isSidebarCollapsed ? [] : openSelectedKeys }
          selectedKeys={ selectedKeys }
          showText={ !isSidebarCollapsed }
          subMenuAction={ toggleKey }
          vertical>
          {mappedMenus( menuItems, isAuthenticated )}
        </Menu>
      </Layout.SideBar>
    );
  }
}
