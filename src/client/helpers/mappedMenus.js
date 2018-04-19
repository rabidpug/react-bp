import Menu from 'Components/Menu';
import React from 'react';

const mappedMenus = ( menuItems, isAuthenticated ) => {
  const filterAuth = item => typeof item.isAuthenticated !== 'boolean' || item.isAuthenticated === !!isAuthenticated;
  const menuItemMap = item =>
    item.subMenu ? (
      <Menu.SubMenu
        icon={ item.icon }
        itemKey={ item.key }
        key={ item.key }
        noItems={ item.subMenu.filter( filterAuth ).length }
        text={ item.label }>
        {item.subMenu.filter( filterAuth ).map( menuItemMap )}
      </Menu.SubMenu>
    ) : (
      <Menu.Item
        icon={ item.icon }
        itemKey={ item.key }
        key={ item.key }
        onClick={ item.action }
        path={ item.path }
        text={ item.label }
      />
    );

  return menuItems.filter( filterAuth ).map( menuItemMap );
};

export default mappedMenus;
