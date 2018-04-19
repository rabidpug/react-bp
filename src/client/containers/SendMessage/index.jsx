import React, { Component, createRef, } from 'react';
import { faComment, faSmile, } from '@fortawesome/free-solid-svg-icons';

import Button from 'Components/Button';
import EmojiPicker from 'emoji-picker-react';
import { FontAwesomeIcon, } from '@fortawesome/react-fontawesome';
import Input from 'Components/Input';
import { connect, } from 'react-redux';
import mapSendMessage from './map';
import styled from 'styled-components';
import styles from 'Styles';

const textToEmoji = {
  ':*' : '😘',
  ':D' : '😀',
  ':P' : '😜',
};

const StyledEmojiButton = styled( FontAwesomeIcon )`
  cursor: pointer;
  opacity: 0.5;
  position: absolute;
  right: 9rem;
  top: 50%;
  color: ${styles.get.darkerGreyColour};
  transform: translateY(-50%);
  &:hover {
    color: ${styles.get.hoverColour};
  }
`;
const EmojiPickerContainer = styled.div`
  bottom: 4rem;
  line-height: normal;
  position: absolute;
  right: 1rem;
  transform-origin: bottom right;
  z-index: 9999;
}`;
const SenderContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  padding: 0 0.3rem;
  position: relative;
`;

@connect( mapSendMessage.State, mapSendMessage.Dispatch )
export default class SendMessage extends Component {
  constructor ( props ) {
    super( props );

    this.messageBox = createRef();

    this.state = {
      isDisplayed  : false,
      messageValue : '',
    };
  }

  handleEmojiClick = () =>
    this.setState( state => ( {
      ...state,
      isDisplayed: !state.isDisplayed,
    } ) );

  handleSelectEmoji = emoji => {
    this.setState( state => ( {
      messageValue: `${state.messageValue}${
        emoji.includes( '-' )
          ? emoji
            .split( '-' )
            .map( m => String.fromCodePoint( parseInt( m, 16 ) ) )
            .join( '' )
          : String.fromCodePoint( parseInt( emoji, 16 ) )
      }`,
    } ) );
  };

  handleSubmit = () => {
    const { sayHello, } = this.props;
    const { messageValue: message, } = this.state;

    if ( message ) {
      sayHello( { message, } );

      this.setState( { messageValue: '', } );
    }
  };

  handleChange = e => {
    const { target: { value, }, } = e;

    const messageValue = value.replace( /(:(?:D|P|\*))/gi, match => textToEmoji[match] );

    this.setState( { messageValue, } );
  };

  handleEnter = e => {
    const { shiftKey, key, } = e;

    if ( key === 'Enter' && !shiftKey ) {
      e.preventDefault();

      this.handleSubmit();
    }
  };

  render () {
    const { isDisplayed, messageValue, } = this.state;
    const { loading, } = this.props;

    return (
      <SenderContainer>
        <Input
          fitContent
          onChange={ this.handleChange }
          onKeyDown={ this.handleEnter }
          placeholder='Heyo :3'
          rows={ 2 }
          type='textarea'
          value={ messageValue }
        />
        <StyledEmojiButton
          icon={ faSmile }
          onClick={ this.handleEmojiClick } />
        {isDisplayed && (
          <EmojiPickerContainer onMouseLeave={ this.handleEmojiClick }>
            <EmojiPicker onEmojiClick={ this.handleSelectEmoji } />
          </EmojiPickerContainer>
        )}
        <Button
          icon={ faComment }
          loading={ loading }
          onClick={ this.handleSubmit }
          style={ { width: '7rem', } }
          variant='primary'>
          Send
        </Button>
      </SenderContainer>
    );
  }
}
