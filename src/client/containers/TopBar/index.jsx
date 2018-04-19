import React, { Component, } from 'react';
import { faChevronLeft, faChevronRight, } from '@fortawesome/free-solid-svg-icons';

import Button from 'Components/Button';
import { FontAwesomeIcon, } from '@fortawesome/react-fontawesome';
import Layout from 'Components/Layout';
import Loading from 'Components/Loading';
import Menu from 'Components/Menu';
import { connect, } from 'react-redux';
import mapTopBar from './map';
import mappedMenus from 'Helpers/mappedMenus';
import styles from 'Styles/TopBar';

@connect( mapTopBar.State, mapTopBar.Dispatch )
export default class TopBar extends Component {
  constructor ( props ) {
    super( props );

    this.state = { openKeys: [], };
  }

  toggleSubMenu = key => {
    this.setState( prevState => {
      const openKeys = [ ...prevState.openKeys, ];

      openKeys.includes( key ) ? openKeys.splice( openKeys.indexOf( key ), 1 ) : openKeys.push( key );

      return {
        ...prevState,
        openKeys,
      };
    } );
  };

  render () {
    const {
      isSidebarCollapsed,
      toggleSidebar,
      actionMenuItems,
      selectedActionKeys,
      isAuthenticated,
      isOnline,
    } = this.props;
    const { openKeys, } = this.state;
    const onlineStatusStyles = { background: isOnline ? '#fff' : 'rgba(117,117,117,0.4)', };

    if ( !isOnline ) onlineStatusStyles.borderTop = '4px solid #f5222d';

    return (
      <Layout.Header>
        <Button
          onClick={ () => toggleSidebar() }
          style={ {
            float  : 'left',
            height : '2.7rem',
          } }
          variant='secondary'>
          <FontAwesomeIcon icon={ isSidebarCollapsed ? faChevronRight : faChevronLeft } />
        </Button>
        {!isOnline && (
          <div className={ styles.offlineSpinContainer }>
            <Loading
              className={ styles.offlineSpinner }
              tip='Offline...' />
          </div>
        )}
        {actionMenuItems && (
          <Menu
            openKeys={ openKeys }
            selectedKeys={ typeof selectedActionKeys === 'object' ? selectedActionKeys : [ selectedActionKeys, ] }
            showText
            subMenuAction={ this.toggleSubMenu }>
            {mappedMenus( actionMenuItems, isAuthenticated )}
          </Menu>
        )}
      </Layout.Header>
    );
  }
}
