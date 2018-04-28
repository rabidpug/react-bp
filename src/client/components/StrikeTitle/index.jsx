import React from 'react';
import styled from 'styled-components';
import styles from 'Styles';

const StrikeTitleText = styled.span`
  position: relative;
  display: inline-block;
  font-weight: 500;
  font-size: 1.2rem;
  &:before,
  &:after {
    content: '';
    position: absolute;
    top: 50%;
    width: 100vw;
    height: 1px;
    background: ${styles.get.colours.whiteD1};
  }
  &:before {
    right: 100%;
    margin-right: 5px;
  }
  &:after {
    left: 100%;
    margin-left: 5px;
  }
`;
const StrikeTitleWrapper = styled.div`
  display: block;
  text-align: center;
  overflow: hidden;
  white-space: nowrap;
  margin-bottom: 1rem;
`;
const StrikeTitle = props => (
  <StrikeTitleWrapper>
    <StrikeTitleText { ...props } />
  </StrikeTitleWrapper>
);

export default StrikeTitle;
