import styled, { css, } from 'styled-components';

import { FontAwesomeIcon, } from '@fortawesome/react-fontawesome';
import React from 'react';
import { faSpinner, } from '@fortawesome/free-solid-svg-icons';
import styles from 'Styles';

const variantStyle = {
  primary: css`
    color: #fff;
    background-color: ${styles.get.primaryColour};
    border-color: ${styles.get.primaryColour};
    border-style: solid;
    &:hover {
      background-color: ${styles.get.lighterColour};
      border-color: ${styles.get.lighterColour};
    }
    &:active {
      background-color: ${styles.get.darkerColour};
      border-color: ${styles.get.darkerColour};
    }
    &:disabled {
      background-color: ${styles.get.lighterColour};
      border-color: ${styles.get.lighterColour};
      opacity: 0.7;
      cursor: wait;
    }
  `,
  secondary: css`
    color: #000;
    background-color: white;
    border-color: ${styles.get.primaryGreyColour};
    border-style: solid;
    &:hover {
      color: ${styles.get.lighterColour};
      border-color: ${styles.get.lighterColour};
    }
    &:active {
      color: ${styles.get.darkerColour};
      border-color: ${styles.get.darkerColour};
    }
  `,
  tertiary: css`
    color: #000;
    border-radius: 0;
    border: 2px solid transparent;
    background-color: transparent;
    &:hover {
      border-bottom: 2px solid ${styles.get.primaryColour};
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
`;
const TextSpan = styled.div`
  max-width: 100%;
  text-overflow: ellipsis;
  margin: 0;
  margin-left: ${( { icon, disabled, } ) => icon || disabled ? '0.5rem' : 0};
  overflow: hidden;
`;
const HrefButton = StyledButton.withComponent( 'a' );
const Button = ( { disabled, children, ...props } ) => {
  const { href, icon, } = props;
  const Component = href ? HrefButton : StyledButton;
  const iconStyle = {
    left     : 5,
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
