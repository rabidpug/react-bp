import { FontAwesomeIcon, } from '@fortawesome/react-fontawesome';
import React from 'react';
import { faSpinner, } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import styles from 'Styles';

const RadioButtonLabel = styled.label`
  border: 1px;
  cursor: pointer;
  display: inline-block;
  font-size: 1rem;
  font-weight: 400;
  min-height: 2rem;
  line-height: 1rem;
  outline: none;
  padding: 0.5rem;
  touch-action: manipulation;
  user-select: none;
  white-space: nowrap;
  text-overflow: ellipsis;
  box-sizing: border-box;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  margin: 0;
  margin-bottom: 1rem;
  border-color: ${( { checked, } ) => checked ? styles.get.colours.primaryL1 : styles.get.colours.greyL1};
  color: ${( { checked, } ) => checked ? styles.get.colours.primary : 'black'};
  border-style: solid;
  user-select: none;
  border-top-width: 1.02px;
  background-color: ${( { disabled, } ) => disabled ? 'rgba(0,0,0,0.1)' : '#fff'};
  position: relative;
  &:first-child {
    border-radius: 0.25rem 0 0 0.25rem;
  }
  &:last-child {
    border-radius: 0 0.25rem 0.25rem 0;
  }
  &:only-child {
    border-radius: 0.25rem;
  }
`;
const RadioButtonInput = styled.input.attrs( { type: 'radio', } )`
  margin: 0;
  display: block;
  opacity: 0;
  width: 0;
  height: 0;
  box-sizing: border-box;
  padding: 0;
  overflow: visible;
`;
const RadioButton = ( { disabled, id, children, ...props } ) => (
  <RadioButtonLabel
    disabled={ disabled }
    htmlFor={ id }
    { ...props }>
    {disabled && (
      <span>
        <FontAwesomeIcon
          icon={ faSpinner }
          spin
          style={ {
            bottom   : 0,
            color    : '#000',
            left     : 0,
            margin   : 'auto',
            position : 'absolute',
            right    : 0,
            top      : 0,
          } }
        />
      </span>
    )}
    <span>
      {children}
      <RadioButtonInput
        id={ id }
        name={ id }
        { ...props } />
    </span>
  </RadioButtonLabel>
);

export default RadioButton;
