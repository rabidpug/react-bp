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
  touch-action: manipulation;
  user-select: none;
  white-space: nowrap;
  box-sizing: border-box;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  ${( { variant, } ) => variantStyle[variant]};
`;
const Button = ( { disabled, children, href, ...props } ) => {
  const Component = href ? StyledButton.withComponent( 'a' ) : StyledButton;

  return (
    <Component
      href={ href }
      { ...props }
      disabled={ disabled }>
      {disabled ? (
        <span>
          <FontAwesomeIcon
            icon={ faSpinner }
            spin /> Loading...
        </span>
      )
        : children
      }
    </Component>
  );
};

export default Button;
