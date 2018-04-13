import React, { Component, } from 'react';

import SendMessage from '../SendMessage';
import { connect, } from 'react-redux';
import gStyles from 'Styles/global';
import { hot, } from 'react-hot-loader';
import mapWelcome from './map';

@hot( module )
@connect( mapWelcome.State )
export default class Welcome extends Component {
  render () {
    const { style, messages, } = this.props;

    return (
      <div
        className={ gStyles.cardStyle }
        style={ { ...style, } }>
        <div className={ gStyles.cardHeader }>
          <h1>Welcome Message</h1>
        </div>
        <div className={ gStyles.cardTop }>
          {messages.map( value => (
            <p key={ value.timestamp + value.userProfile.displayNames }>
              {`${value.userProfile.displayNames}: ${value.message}`}
            </p>
          ) )}
        </div>
        <div className={ gStyles.cardBottom }>
          <SendMessage />
        </div>
      </div>
    );
  }
}
