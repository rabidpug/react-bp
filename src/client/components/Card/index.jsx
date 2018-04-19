import React, { PureComponent, } from 'react';

import styled from 'styled-components';
import styles from 'Styles';

const CardWrapper = styled.div`
  background-color: #fff;
  box-shadow: 0 0.25rem 0.375rem 0 rgba(0, 0, 0, 0.2);
  left: 0;
  display: flex;
  flex-direction: column;
  margin: 0.75rem 2rem;
  margin-left: auto;
  margin-right: auto;
  max-width: 1000px;
  padding: 0;
  position: absolute;
  right: 0;
  text-align: center;
  top: 0;
  width: calc(100% - 4rem);
  min-height: 50%;
  max-height: calc(100% - 1.5rem);
  @media (max-width: 767.98px) {
    height: 100%;
    margin: 0;
    max-height: 100%;
    max-width: 100%;
    width: 100%;
  }
`;

export default class Card extends PureComponent {
  static Body = styled.div`
    display: block;
    flex: 1;
    flex-grow: 1;
    margin: 0;
    padding: 0.625rem;
    overflow: auto;
    ${styles.get.scrollBar};
  `;

  static Footer = styled.div`
    background-color: ${styles.get.midGreyColour};
    box-shadow: 0 0.125rem 0.375rem 0 rgba(0, 0, 0, 0.2);
    padding: 0.625rem 0;
  `;

  static Header = styled.div`
    background-color: ${styles.get.lighterGreyColour};
    padding-top: 0.625rem;
    user-select: none;
  `;

  render () {
    return <CardWrapper { ...this.props } />;
  }
}
// export default Card;
