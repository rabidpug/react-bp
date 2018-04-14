import { Button, Form, Input, } from 'antd';
import React, { Component, createRef, } from 'react';

import ContentEditable from 'react-contenteditable';
import EmojiConverter from 'emoji-js';
import EmojiPicker from 'emoji-picker-react';
import classnames from 'classnames';
import { connect, } from 'react-redux';
import gStyles from 'Styles/global';
import mapSendMessage from './map';

const { Item, } = Form;
const { create, } = Form;

const emojiMaker = new EmojiConverter();
const textToEmoji = {
  ':*' : emojiMaker.replace_colons( ':kissing_heart:' ),
  ':D' : emojiMaker.replace_colons( ':grin:' ),
  ':P' : emojiMaker.replace_colons( ':stuck_out_tongue_winking_eye:' ),
};
emojiMaker.img_set = 'emojione'; //eslint-disable-line

emojiMaker.img_sets.emojione.path = 'https://cdn.jsdelivr.net/emojione/assets/3.0/png/32/';

emojiMaker.supports_css = false; //eslint-disable-line
emojiMaker.allow_native = false; //eslint-disable-line
emojiMaker.replace_mode = 'unified'; //eslint-disable-line

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

  handleSelectEmoji = ( id, emoji ) => {
    const emojiImg = emojiMaker.replace_colons( `:${emoji.name}:` );

    this.setState( state => ( { messageValue: state.messageValue + emojiImg, } ) );
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
      const range = document.createRange(); //Create a range (a range is a like the selection but invisible)

      range.selectNodeContents( this.messageBox.current.htmlEl ); //Select the entire contents of the element with the range

      range.collapse( false ); //collapse the range to the end point. false means collapse to end rather than the start

      const selection = window.getSelection(); //get the selection object (allows you to change selection)

      selection.removeAllRanges(); //remove any selections already made

      selection.addRange( range ); //make the range you have just created the visible selection
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
          <ContentEditable
            className={ classnames( 'ant-input', gStyles.inputArea ) }
            html={ messageValue }
            onChange={ this.handleChange }
            onKeyDown={ this.handleEnter }
            ref={ this.messageBox }
          />
        </Item>
        <Item
          style={ {
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
              <EmojiPicker
                onEmojiClick={ this.handleSelectEmoji }
                preload />
            </div>
          )}
          <Button
            icon='smile-o'
            onClick={ this.handleEmojiClick }
            shape='circle'
            type='dashed' />
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
