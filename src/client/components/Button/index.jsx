import styled, { css, } from 'styled-components';

import { FontAwesomeIcon, } from '@fortawesome/react-fontawesome';
import React from 'react';
import { faSpinner, } from '@fortawesome/free-solid-svg-icons';
import styles from 'Styles';

const variantStyle = {
  primary: css`
    color: #fff;
    background-color: ${styles.get.colours.primary};
    border-color: ${styles.get.colours.primary};
    border-style: solid;
    &:hover,
    :disabled {
      background-color: ${styles.get.colours.primaryL2};
      border-color: ${styles.get.colours.primaryL2};
    }
    &:active {
      background-color: ${styles.get.colours.primaryD1};
      border-color: ${styles.get.colours.primaryD1};
    }
    &:disabled {
      opacity: 0.7;
      cursor: wait;
    }
  `,
  secondary: css`
    color: ${styles.get.colours.greyD2};
    background-color: white;
    border-color: ${styles.get.colours.greyL2};
    border-style: solid;
    &:hover {
      color: ${styles.get.colours.primaryL2};
      border-color: ${styles.get.colours.primaryL2};
    }
    &:active {
      color: ${styles.get.colours.primaryD1};
      border-color: ${styles.get.colours.primaryD1};
    }
  `,
  tertiary: css`
    color: #000;
    border-radius: 0;
    border: 2px solid transparent;
    background-color: transparent;
    &:hover {
      border-bottom: 2px solid ${styles.get.colours.primary};
    }
  `,
};
const StyledButton = styled.button`
  border-radius: 0.25rem;
  border: 1px;
  cursor: pointer;
  display: inline-block;
  font-size: 1rem;
  font-weight: 400;
  height: 2rem;
  line-height: ${( { href, } ) => href ? '2rem' : '1.5rem'};
  vertical-align: middle;
  margin: 0.5rem;
  outline: none;
  padding: 0 1rem;
  text-decoration: none;
  touch-action: manipulation;
  user-select: none;
  white-space: nowrap;
  box-sizing: border-box;
  position: relative;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  ${( { variant, } ) => variantStyle[variant]};
  &:hover,
  :visited,
  :link,
  :active {
    text-decoration: none;
  }
`;
const TextSpan = styled.div`
  max-width: 100%;
  text-overflow: ellipsis;
  margin: 0;
  margin-left: ${( { icon, disabled, } ) => icon || disabled ? '0.7rem' : 0};
  overflow: hidden;
`;
const HrefButton = StyledButton.withComponent( 'a' );
const Button = ( { disabled, children, ...props } ) => {
  const { href, icon, } = props;
  const Component = href ? HrefButton : StyledButton;
  const iconStyle = {
    left     : 7,
    position : 'absolute',
    top      : '25%',
  };

  return (
    <Component
      { ...props }
      disabled={ disabled }>
      {disabled
        ? <FontAwesomeIcon
          icon={ faSpinner }
          spin
          style={ iconStyle } />
        :         icon && <FontAwesomeIcon
          icon={ icon }
          style={ iconStyle } />
      }
      <TextSpan
        disabled={ disabled }
        icon={ icon }>
        {children}
      </TextSpan>
    </Component>
  );
};

export default Button;
