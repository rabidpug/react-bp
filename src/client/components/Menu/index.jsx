import React, { PureComponent, } from 'react';
import { faChevronDown, faChevronUp, } from '@fortawesome/free-solid-svg-icons';
import styled, { css, } from 'styled-components';

import { FontAwesomeIcon, } from '@fortawesome/react-fontawesome';
import styles from 'Styles';

const isSelectedStyling = css`
  background-color: ${( { isSelected, } ) => isSelected ? styles.get.primaryColour : 'inherit'};
`;
const isOpenPadding = ( { vertical, showText, childCount = 0, } ) =>
  vertical && showText ? `${1 + 0.5 * childCount}rem` : '1.3rem';
const orientationStyling = ( { vertical, childCount, isSubMenu, } ) =>
  vertical
    ? css`
        display: block;
        height: 2.2rem;
        line-height: 2rem;
        width: 100%;
        color: ${styles.get.primaryWhiteColour};
        &:hover {
          background-color: ${styles.get.hoverColour};
        }
      `
    : css`
        height: 3rem;
        line-height: 3rem;
        width: ${isSubMenu ? '100%' : 'auto'}
        color: ${styles.get.darkerGreyColour};
        border-bottom: 1px solid rgba(0, 0, 0, 0.2);
        margin: ${childCount ? 0 : '0 0.25rem'};
        &:hover {
          border-bottom: 2px solid ${styles.get.primaryColour};
          color: ${styles.get.primaryColour};
        }
      `;
const liSubMenuStyling = ( { vertical, childCount, } ) =>
  vertical
    ? css`
        display: block;
        color: ${styles.get.primaryWhiteColour};
      `
    : css`
        display: flex;
        float: ${childCount === 1 && 'right'};
        color: ${styles.get.darkerGreyColour};
        margin: 0;
      `;
const subMenuOrientationStyling = ( { vertical, childCount, } ) =>
  vertical
    ? ''
    : childCount > 1
      ? css`
          position: absolute;
          right: 100%;
          top: 0.25rem;
        `
      : css`
          position: absolute;
          top: 3rem;
          right: 0;
        `;

const SubMenuLi = styled.li`
  transition: all 0.2s;
  color: ${styles.get.primaryWhiteColour};
  position: relative;
  flex: 1;
  ${isSelectedStyling};
  ${liSubMenuStyling};
`;

const SubMenuUl = styled.ul`
  padding: 0;
  transition: all 0.2s;
  flex: 1;
  z-index: 99;
  overflow: ${( { isOpen, } ) => isOpen ? 'inherit' : 'hidden'}
  box-shadow: ${( { vertical, } ) =>
    vertical ? 'inset 0 2px 8px rgba(0, 0, 0, 0.45)' : '0 0.125rem 0.375rem 0 rgba(0, 0, 0, 0.2)'};
  border-color: ${styles.get.primaryWhiteColour};
  background-color: ${( { vertical, } ) => vertical ? styles.get.darkestGreyColour : '#fff'};
  max-height: ${( { isOpen, noItems, vertical, } ) => isOpen ? `${noItems * ( vertical ? 2.6 : 3.3 )}rem` : 0};
  height: auto;

  ${subMenuOrientationStyling};
`;
const SubMenuTitle = styled.span`
  transition: all 0.2s;
  padding: 0 ${isOpenPadding};
  overflow: hidden;
  flex: 1;
  color: ${styles.get.primaryWhiteColour};
  ${isSelectedStyling};
  ${orientationStyling};
`;
const MenuItem = styled.li`
  overflow: hidden;
  transition: all 0.2s;
  margin: 0.3rem 0;
  padding: 0 ${isOpenPadding};
  flex: 1;
  float: ${( { vertical, } ) => vertical ? 'none' : 'right'};
  ${isSelectedStyling};
  ${orientationStyling};
`;
const MenuItemText = styled.span`
  transition: all 0.2s;
  margin-left: 0.5rem;
  flex: 1;
  max-width: ${( { showText, } ) => showText ? '200px' : 0};
  display: inline-block;
  overflow: hidden;
`;

const MenuWrapper = styled.ul`
  list-style-type: none;
  cursor: pointer;
  white-space: nowrap;
  padding: 0;
  transition: all 0.2s;
  user-select: none;
  display: ${( { vertical, } ) => vertical ? 'block' : 'inline-block'};
  float: ${( { vertical, } ) => vertical ? 'none' : 'right'};
  flex: 1;
`;

export default class Menu extends PureComponent {
  static Item = ( { icon, text, path, onClick, itemAction, selectedKeys, itemKey, ...props } ) => (
    <MenuItem
      isSelected={ selectedKeys.includes( itemKey ) }
      onClick={ onClick ? onClick : () => itemAction( path ) }
      { ...props }>
      {icon && (
        <FontAwesomeIcon
          icon={ icon }
          style={ {
            height     : props.vertical ? '2.2rem' : '3rem',
            transition : 'all 0.2s',
          } }
        />
      )}
      <MenuItemText showText={ props.showText }>{text}</MenuItemText>
    </MenuItem>
  );

  static SubMenu = ( {
    children,
    childCount = 0,
    icon,
    text,
    itemKey,
    noItems,
    selectedKeys,
    openKeys,
    showText,
    vertical,
    subMenuAction,
    itemAction,
    ...props
  } ) => {
    childCount = childCount + 1;

    const isSubMenu = true;

    const liProps = {
      childCount,
      vertical,
    };

    if ( !vertical ) {
      liProps.onMouseEnter = () => subMenuAction( itemKey );

      liProps.onMouseLeave = () => subMenuAction( itemKey );
    }
    const isOpen = openKeys.includes( itemKey );
    const childProps = {
      childCount,
      isSubMenu,
      itemAction,
      openKeys,
      selectedKeys,
      showText,
      subMenuAction,
      vertical,
    };

    return (
      <SubMenuLi { ...liProps }>
        <SubMenuTitle
          { ...childProps }
          childCount={ childCount - 1 }
          isOpen={ isOpen }
          isSelected={ selectedKeys.includes( itemKey ) }
          onClick={ () => subMenuAction( itemKey ) }>
          {icon && (
            <FontAwesomeIcon
              icon={ icon }
              style={ {
                height     : vertical ? '2.2rem' : '3rem',
                transition : 'all 0.2s',
              } }
            />
          )}
          <MenuItemText showText={ showText }>{text}</MenuItemText>
          {showText &&
            vertical && (
            <FontAwesomeIcon
              icon={ isOpen ? faChevronUp : faChevronDown }
              size='xs'
              style={ {
                float  : 'right',
                height : '2rem',
              } }
            />
          )}
        </SubMenuTitle>
        <SubMenuUl
          isOpen={ isOpen }
          noItems={ noItems }
          { ...childProps }
          { ...props }>
          {React.Children.map( children, child => React.cloneElement( child, childProps ) )}
        </SubMenuUl>
      </SubMenuLi>
    );
  };

  render () {
    const { children, selectedKeys, openKeys, subMenuAction, itemAction, showText, vertical, } = this.props;

    const childProps = {
      itemAction,
      openKeys,
      selectedKeys,
      showText,
      subMenuAction,
      vertical,
    };
    const childrenWithProps = React.Children.map( children,
                                                  child => typeof child.type === 'string' ? child : React.cloneElement( child, childProps ) );

    return <MenuWrapper { ...this.props }>{childrenWithProps}</MenuWrapper>;
  }
}
