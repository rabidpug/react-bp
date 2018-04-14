import { Button, Form, Icon, Input, } from 'antd';
import React, { Component, createRef, } from 'react';

import ContentEditable from 'react-contenteditable';
import EmojiPicker from 'emoji-picker-react';
import classnames from 'classnames';
import { connect, } from 'react-redux';
import gStyles from 'Styles/global';
import mapSendMessage from './map';

const { Item, } = Form;
const { create, } = Form;
const textToEmoji = {
  ':*' : '😘',
  ':D' : '😀',
  ':P' : '😜',
};

@connect( mapSendMessage.State, mapSendMessage.Dispatch )
@create()
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
    this.setState( state => ( { messageValue: `${state.messageValue}&#x${emoji.includes( '-' ) ? emoji.split( '-' ).join( '&#x' ) : emoji}`, } ) );
  };

  handleSubmit = () => {
    const { sendMessage, } = this.props;
    const { messageValue: message, } = this.state;

    if ( message ) {
      sendMessage( { message, } );

      this.setState( { messageValue: '', } );
    }
  };

  handleChange = e => {
    e.persist();

    const { target, } = e;

    const messageValue = target.value.replace( /(:(?:D|P|\*))/gi, match => textToEmoji[match] );

    this.setState( { messageValue, }, () => {
      const range = document.createRange();

      range.selectNodeContents( this.messageBox.current.htmlEl );

      range.collapse( false );

      const selection = window.getSelection();

      selection.removeAllRanges();

      selection.addRange( range );
    } );
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
      <Form
        onSubmit={ this.handleSubmit }
        style={ {
          display       : 'flex',
          flexDirection : 'row',
        } }>
        <Item
          hasFeedback={ false }
          style={ {
            flex   : 1,
            margin : 5,
          } }>
          <Input style={ { display: 'none', } } />
          <Icon
            style={ {
              height    : '100%',
              left      : 5,
              opacity   : 0.5,
              position  : 'absolute',
              top       : '50%',
              transform : 'translateY(-50%)',
              zIndex    : 2,
            } }
            type='mail'
          />
          <ContentEditable
            className={ classnames( 'ant-input', gStyles.inputArea ) }
            html={ messageValue }
            onChange={ this.handleChange }
            onKeyDown={ this.handleEnter }
            ref={ this.messageBox }
          />
          <Icon
            className={ gStyles.emojiButton }
            onClick={ this.handleEmojiClick }
            type='smile-o' />
        </Item>
        <Item
          style={ {
            height       : '100%',
            margin       : 5,
            marginBottom : 'auto',
            marginLeft   : 2.5,
            marginRight  : 2.5,
            marginTop    : 'auto',
          } }>
          {isDisplayed && (
            <div
              className={ gStyles.emojiPicker }
              onMouseLeave={ this.handleEmojiClick }>
              <EmojiPicker onEmojiClick={ this.handleSelectEmoji } />
            </div>
          )}
        </Item>
        <Item
          style={ {
            margin       : 5,
            marginBottom : 'auto',
            marginTop    : 'auto',
          } }>
          <Button
            icon='message'
            loading={ loading }
            onClick={ this.handleSubmit }
            type='primary'>
            Send
          </Button>
        </Item>
      </Form>
    );
  }
}
