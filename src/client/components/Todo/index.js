// @flow

import React from 'react';

type Props = {
  completed: boolean,
  onClick: Function,
  text: string
}
const Todo: Function = ( {
  onClick, completed, text,
}: Props ) => (
  <li
    onClick={ onClick }
    style={ { textDecoration: completed
      ? 'line-through'
      : 'none',  } }
  >
    {text}
  </li>
);

export default Todo;
