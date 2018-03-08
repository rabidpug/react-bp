import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';

describe(
  'App', () => {
    it(
      'renders without crashing', () => {
        ReactDOM.render(
          <App />,
          document.getElementById( 'root' ) || document.createElement( 'div' )
        );
      }
    );
  }
);
