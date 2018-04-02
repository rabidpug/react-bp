// @flow

import { Icon, Spin, } from 'antd';

import React from 'react';
import styles from 'Styles/Loading';

const antIcon = ( <Icon
  spin
  style={ { fontSize: 24, } }
  type='loading' /> );
const Loading: Function = () => (
  <Spin
    className={ styles.spinner }
    delay={ 500 }
    indicator={ antIcon }
    size='large'
    tip='Loading...'
    wrapperClassName={ styles.centrePosition }>
    <div />
  </Spin>
);

export default Loading;
