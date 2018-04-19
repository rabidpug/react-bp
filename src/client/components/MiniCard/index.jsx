import React, { PureComponent, } from 'react';
import styled, { css, } from 'styled-components';

import MicroLinkCard from 'react-microlink';
import styles from 'Styles';

const dogEar = css`
  border: 22px solid;
  border-color: ${styles.get.lighterGreyColour} transparent transparent;
  bottom: auto;
  content: ' ';
  height: 0;
  position: absolute;
  top: 0;
  width: 0;
  z-index: -1;
`;
const cardAlignment = ( { alignRight, } ) =>
  alignRight
    ? css`
        float: right;
        &::before {
          ${dogEar};
          left: auto;
          right: -20px;
        }
      `
    : css`
        float: left;
        &::after {
          ${dogEar};
          left: -20px;
          right: auto;
        }
      `;
const textAlign = ( { alignRight, } ) =>
  css`
    text-align: ${alignRight ? 'right' : 'left'};
  `;
const CardWrapper = styled.div`
  background-color: #fff;
  border-radius: 0.7rem;
  box-shadow: 0 0.125rem 0.375rem 0 rgba(0, 0, 0, 0.2);
  clear: both;
  margin: 0.7rem 1.3rem;
  max-width: 60%;
  position: relative;
  z-index: 1;
  ${cardAlignment};
`;

const HeaderWrapper = styled.div`
  background-color: ${styles.get.lighterGreyColour};
  border-radius: 0.7rem 0.7rem 0 0;
  display: flex;
  flex-direction: row;
  padding: 0.5rem;
`;
const Avatar = styled.img`
  margin: auto;
  width: 40px;
  height: 40px;
  clip-path: circle(50%);
`;
const TitleWrapper = styled.div`
  flex: 1;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  ${textAlign};
`;

const Title = styled.div`
  color: hsl(0, 0%, 13%);
  font-size: 0.85rem;
  font-weight: 700;
`;
const Description = styled.div`
  color: hsl(0, 0%, 45%);
  font-size: 0.6rem;
  font-weight: 400;
`;
const BodyWrapper = styled.div`
  padding: 0.2rem 0.5rem 0.5rem;
  ${textAlign};
  white-space: pre-line;
  & img {
    height: 1.1rem;
    width: 1.1rem;
  }
`;
const urlsFinder = /(?:http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?([a-z0-9]+(?:[-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(?::[0-9]{1,5})?(?:\/.[a-z]{2,5})?)(?![a-z0-9])/gi;
const Message = ( { message, } ) => (
  <span
    dangerouslySetInnerHTML={ {
      __html: message.replace( urlsFinder,
                               match => `<a
            href='https://${match}'
            target='_blank' style='display:inline-block'>
            ${match}
          </a>` ),
    } }
  />
);
const Url = ( { message, } ) =>
  urlsFinder.test( message ) && (
    <MicroLinkCard
      screenshot
      style={ {
        margin   : 5,
        minWidth : '30vw',
      } }
      url={ `https://${message.match( urlsFinder )[0].toLowerCase()}` }
    />
  );

export default class MiniCard extends PureComponent {
  static Header = ( { avatar, title, description, alignRight, ...props } ) => (
    <HeaderWrapper { ...props }>
      {!alignRight && <Avatar src={ avatar } />}
      <TitleWrapper alignRight={ alignRight }>
        <Title>{title}</Title>
        <Description>{description}</Description>
      </TitleWrapper>
      {alignRight && <Avatar src={ avatar } />}
    </HeaderWrapper>
  );

  static Body = ( { message, children, ...props } ) => (
    <BodyWrapper { ...props }>
      {message && <Message message={ message } />}
      {message && <Url message={ message } />}
      {children}
    </BodyWrapper>
  );

  render () {
    const { children, alignRight, } = this.props;
    const childrenWithProps = React.Children.map( children,
                                                  child => typeof child.type === 'string' ? child : React.cloneElement( child, { alignRight, } ) );

    return <CardWrapper { ...this.props }>{childrenWithProps}</CardWrapper>;
  }
}
