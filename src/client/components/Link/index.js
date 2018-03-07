// @flow

import type { Node, } from 'react';
import React from 'react';

type Props = {
  active: boolean,
  children: Node,
  onClick: Function,
};
const Link: Function = ( {
  active, children, onClick,
}: Props ) => {
  if ( active ) return <span>{children}</span>;

  return (
    <a
      href=''
      onClick={ e => {
        e.preventDefault();

        onClick();
      } }>
      {children}
    </a>
  );
};

export default Link;
