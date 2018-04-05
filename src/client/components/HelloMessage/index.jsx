// @flow

import { Card, } from 'antd';
import HelloButton from '../Button/HelloButton';
import React from 'react';
import { connect, } from 'react-redux';
import gStyles from 'Styles/global';
import { getGreeterMessage, } from 'Store/greeter/selectors';
const mapStateToProps = state => ( { children: (
  <span>
    <div className={ gStyles.cardTop }>
      <p>{getGreeterMessage( state )}</p>
    </div>
    <div className={ gStyles.cardBottom }>
      <HelloButton />
    </div>
  </span>
),
                                     className: gStyles.cardStyle, } );
const mapDispatchToProps = () => ( {} );
const HelloMessage = connect(
  mapStateToProps, mapDispatchToProps
)( Card );

export default HelloMessage;
