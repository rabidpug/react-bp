import { Icon, } from 'antd';
import React from 'react';

const IconText = ( {
  type, text, onClick,
} ) => (
  <span onClick={ onClick }>
    <Icon
      style={ { marginRight: 8, } }
      type={ type } />
    {text}
  </span>
);

export default IconText;
