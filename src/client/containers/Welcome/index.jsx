import React, { Component, } from 'react';

import Card from 'Components/Card';
import Message from 'Components/Message';
import SendMessage from 'Containers/SendMessage';
import { connect, } from 'react-redux';
import { hot, } from 'react-hot-loader';
import map from './map';

@hot( module )
@connect( map.State )
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
      <Card>
        <Card.Header>
          <h1 style={ { margin: 0, } }>Welcome Messaging</h1>
        </Card.Header>
        <Card.Body>
          {messages.length === 0
            ? <p style={ { width: '100%', } }>No Messages</p>
            :             messages.map( value => (
              <Message
                isUser={ value.userProfile.publicId === publicId }
                { ...value }
                key={ value.timestamp + value.userProfile.displayNames }
              />
            ) )
          }

          <div
            ref={ el => {
              this.messagesEnd = el;
            } }
            style={ {
              clear : 'both',
              float : 'left',
            } }
          />
        </Card.Body>
        <Card.Footer>
          <SendMessage />
        </Card.Footer>
      </Card>
    );
  }
}
