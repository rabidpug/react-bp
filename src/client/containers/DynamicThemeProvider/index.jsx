import React, { Component, } from 'react';

import { ThemeProvider, } from 'styled-components';
import { connect, } from 'react-redux';
import mapDynamicThemeProvider from './map';

@connect( mapDynamicThemeProvider.State )
export default class DynamicThemeProvider extends Component {
  render () {
    return <ThemeProvider { ...this.props } />;
  }
}
