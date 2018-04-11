import { Button, Icon, Layout, Menu, Spin, } from 'antd';
import React, { Component, } from 'react';

import SlideWrap from 'Animations/SlideWrap';
import { connect, } from 'react-redux';
import mapTopBar from './map';
import styles from 'Styles/TopBar';

const { Item, SubMenu, } = Menu;

const { Header, } = Layout;

@connect( mapTopBar.State, mapTopBar.Dispatch )
@SlideWrap
export default class TopBar extends Component {
  render () {
    const {
      isSidebarCollapsed,
      toggleSideBar,
      actionMenuItems,
      selectedActionKeys,
      isAuthenticated,
      style,
      isOnline,
    } = this.props;
    const filterAuth = item => typeof item.isAuthenticated !== 'boolean' || item.isAuthenticated === isAuthenticated;

    const menuItemMap = item =>
      item.subMenu ? (
        <SubMenu
          key={ item.key }
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
          action={ item.action }
          key={ item.key }>
          {item.component
            ? <item.component { ...item } />
            : (
              <span>
                <Icon type={ item.icon } />
                {item.label}
              </span>
            )}
        </Item>
      );
    const onlineStatusStyles = { background: isOnline ? '#fff' : 'rgba(117,117,117,0.4)', };

    if ( !isOnline ) onlineStatusStyles.borderTop = '4px solid #f5222d';

    return (
      <Header
        className={ styles.topBarHeader }
        style={ {
          ...onlineStatusStyles,
          padding: 0,
        } }>
        <Button
          className={ styles.trigger }
          icon={ isSidebarCollapsed ? 'menu-unfold' : 'menu-fold' }
          onClick={ toggleSideBar }
        />
        {!isOnline && (
          <div className={ styles.offlineSpinContainer }>
            <Spin
              className={ styles.offlineSpinner }
              tip='Offline...' />
          </div>
        )}
        {actionMenuItems && (
          <Menu
            className={ styles.topBarMenu }
            mode='horizontal'
            onClick={ ( { item, } ) => item.props.action && item.props.action() }
            selectedKeys={ typeof selectedActionKeys === 'object' ? selectedActionKeys : [ selectedActionKeys, ] }
            style={ { ...style, } }>
            {actionMenuItems.filter( filterAuth ).map( menuItemMap )}
          </Menu>
        )}
      </Header>
    );
  }
}
