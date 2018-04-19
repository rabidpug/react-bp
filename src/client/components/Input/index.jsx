import React, { Component, } from 'react';

import styled from 'styled-components';
import styles from 'Styles';

const lines = /\n\r|\n|\r/g;
const InputWrapper = styled.input`
  resize: both;
  text-align: left;
  box-sizing: border-box;
  list-style: none;
  position: relative;
  display: inline-block;
  padding: 0.25rem 1.5rem 0rem 0.25rem;
  font-size: 1.5rem;
  zoom: 0.75;
  line-height: 1.5rem;
  flex: 1;
  vertical-align: middle;
  min-height: ${( { rows = 1, } ) => `${rows * 1.5 + 0.5}rem`};
  height: ${( { value = '', fitContent, } ) =>
    value.match( lines ) && fitContent ? `${value.match( lines ).length * 1.5 + 2}rem` : '1.75rem'}
  touch-action: manipulation;
  overflow: visible;
  color: rgba(0, 0, 0, 0.65);
  background-color: #fff;
  background-image: none;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  transition: all 0.3s;
  &:hover,
  :focus {
    border-color: ${styles.get.lighterColour};
  }
  &:focus {
    outline: 0;
    box-shadow: 0 0 0 2px ${styles.get.hoverColour};
  }
  &::placeholder {
    color: ${styles.get.primaryGreyColour};
  }
`;
const TextArea = InputWrapper.withComponent( 'textarea' );

export default class Input extends Component {
  render () {
    const { type, ...props } = this.props;

    if ( type === 'textarea' ) return <TextArea { ...props } />;

    return <InputWrapper { ...this.props } />;
  }
}
