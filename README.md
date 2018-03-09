# React BoilerPlate

![GitHub last commit](https://img.shields.io/github/last-commit/google/skia.svg)
[![Build Status](https://img.shields.io/travis/rabidpug/react-bp.svg?style=flat-square)](https://travis-ci.org/rabidpug/react-bp)
[![Coverage Status](https://img.shields.io/coveralls/rabidpug/react-bp.svg?style=flat-square)](https://coveralls.io/github/rabidpug/react-bp?branch=master)
![GitHub repo size in bytes](https://img.shields.io/github/repo-size/badges/shields.svg)
![license](https://img.shields.io/github/license/mashape/apistatus.svg)
[![Heroku Staging](https://img.shields.io/badge/heroku-staging-yellow.svg)](https://react-bp-staging.herokuapp.com/)

A React Boilerplate

## Table of Contents

* [Folder Structure](#folder-structure)
* [Client Libraries](#client-libraries)
  * [React](#react)
  * [Loadable](#loadable)
  * [Router](#router)
  * [Redux](#redux)
  * [Semantic UI](#semantic-ui)
* [Server Libraries](#server-libraries)
* [Dev Libraries](#dev-libraries)

## Folder Structure

```javascript
|--src //primary dev folder
| |--client //client-side stuff
| | |--assets //images and files
| | |--components //simple adaptable components, no care for redux store
| | | |--Button //example component
| | | | |--index.js //use index.js for simple imports
| | | | |--styles.scss //style modules
| | |--containers //components linked to redux store
| | | |--HelloButton //example container, wraps Button with redux store)
| | | | |--index.js //use index.js for simple imports
| | |--scenes //collections of containers and other scenes
| | | |--Home //example scene
| | | | |--index.js //use index.js for simple imports
| | | | |--styles.scss //style modules
| | |--store //redux store actions and reducers
| | | |--greeter //example split reducer
| | | | |--actions.js //the action functions which make up the reducer
| | | | |--creators.js //the action creators to be used by containers
| | | | |--index.js //creates reducer from actions and initial state
| | | | |--initialState.js //initial state for reducer
| | | | |--types.js //action types
| | | |--index.js //exports all split reducers for combining
| | |--index.html //html template
| | |--index.js //js entry point
| | |--index.test.js //index jest test. Doesn't do much...
|--.babelrc //babel config
|--.eslintrc //eslint config
|--.flowconfig //flow config
|--webpack.config.babel.js //webpack config
```

## Client Libraries

Client side uses React with Loadable for code-splitting, Router for route management, Redux for state management, and Semantic UI for user interface.

* [React](#react)
* [Loadable](#loadable)
* [Router](#router)
* [Redux](#redux)
* [Semantic UI](#semantic-ui)

### React

[ReactJS](https://reactjs.org/) library for client SPA. See link for intro to React and Folder Structure for breakdown of structure in this Boilerplate.

```javascript
import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(<App />, document.getElementById('root'));
```

#### Loadable

[React Loadable](https://github.com/jamiebuilds/react-loadable) provides Code splitting for React components. See github for usage guide.

```javascript
const LoadableComponent = Loadable({
  loader: () => import('../../components/Bye'),
  loading: Loading,
});
```

#### Router

[React Router](https://reacttraining.com/react-router/) provides route management for React. See link for usage guide. Integrated with Redux using [React Router Redux](https://github.com/reactjs/react-router-redux).

```javascript
import * as reducers from './reducers';

import { ConnectedRouter, routerMiddleware, routerReducer } from 'react-router-redux';
import { configureStore, createDefaultMiddleware } from '@acemarke/redux-starter-kit';

import Home from './scenes/Home';
import { Provider } from 'react-redux';
import React from 'react';
import createHistory from 'history/createBrowserHistory';
import { hot } from 'react-hot-loader';

const history = createHistory();
const middleware = createDefaultMiddleware(routerMiddleware(history));
const preloadedState = { message: 'Do you wanna say hi?' };
const reducer = {
  ...reducers,
  router: routerReducer,
};
const store = configureStore({
  devTools: process.env.NODE_ENV !== 'production',
  middleware,
  preloadedState,
  reducer,
});

const App = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Home />
    </ConnectedRouter>
  </Provider>
);

export default hot(module)(App);
```

#### Redux

[Redux](https://redux.js.org/) provides state management for React. See link for usage guide. Also using [Redux Thunk](https://github.com/gaearon/redux-thunk) for async actions and [Redux Starter Kit](https://github.com/markerikson/redux-starter-kit) for simplified reducer creation. See [Router](#router) section for initialising example.

```javascript
//actions/hello.js
export const sayHello = (state, message) => ({
  ...state,
  message,
});

//reducers/hello.js
import { createReducer } from '@acemarke/redux-starter-kit';
import { sayHello } from '../actions/hello';

const helloReducer = createReducer([], { SAY_HELLO: sayHello });

export default helloReducer;

//reducers/index.js
export { default as hello } from './hello';
```

#### Semantic UI

[Semantic UI React](https://react.semantic-ui.com/) provides a library of components to use for simple User Interface work, no need to build and style from scratch. Make sure to:

```javascript
import 'semantic-ui-css/semantic.min.css';
```

## Server Libraries

Server Libraries stuff

## Dev Libraries

Dev Libraries stuff
