import AppWrap from './containers/AppWrap';
import React from 'react';
import ReactDOM from 'react-dom';

describe(
  'App', () => {
    it(
      'renders without crashing', () => {
        ReactDOM.render(
          <AppWrap />, document.getElementById( 'root' ) || document.createElement( 'div' )
        );
      }
    );
  }
);
