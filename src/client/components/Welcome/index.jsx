import React, { Component, } from 'react';

import Message from '../Message';
import SendMessage from '../SendMessage';
import { connect, } from 'react-redux';
import gStyles from 'Styles/global';
import { hot, } from 'react-hot-loader';
import mapWelcome from './map';

@hot( module )
@connect( mapWelcome.State )
export default class Welcome extends Component {
  componentDidMount () {
    this.scrollToBottom();
  }

  componentDidUpdate () {
    this.scrollToBottom();
  }

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView( { behavior: 'smooth', } );
  };

  render () {
    const { messages, publicId, } = this.props;

    return (
      <div
        className={ gStyles.cardStyle }
        style={ {
          display       : 'flex',
          flexDirection : 'column',
        } }>
        <div className={ gStyles.cardHeader }>
          <h1>Welcome Messaging</h1>
        </div>
        <div
          className={ gStyles.cardTop }
          style={ { display: 'inline-block', } }>
          {messages.map( value => (
            <Message
              isUser={ value.userProfile.publicId === publicId }
              { ...value }
              key={ value.timestamp + value.userProfile.displayNames }
            />
          ) )}

          <div
            ref={ el => {
              this.messagesEnd = el;
            } }
            style={ {
              clear : 'both',
              float : 'left',
            } }
          />
        </div>
        <div className={ gStyles.cardBottom }>
          <SendMessage />
        </div>
      </div>
    );
  }
}
