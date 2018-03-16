import { Avatar, List, } from 'antd';

import IconText from './IconText';
import React from 'react';

const { Item, } = List;
const { Meta, } = Item;
const ListItem = ( {
  toggleTodoItem, deleteTodoItem, completedDate, createdDate, text,
} ) => (
  <Item
    actions={ [
      <IconText
        key='markit'
        onClick={ toggleTodoItem }
        text={ completedDate ? 'Mark Incomplete' : 'Mark Completed' }
        type={ completedDate ? 'exclamation-circle-o' : 'check' }
      />,
      <IconText
        key='deleteit'
        onClick={ deleteTodoItem }
        text='Delete'
        type='close-square-o' />,
    ] }
    extra={ <Avatar icon={ completedDate ? 'check' : 'exclamation-circle-o' } /> }>
    <Meta
      description={
        <div>
          {`Created On: ${new Date( createdDate ).toLocaleDateString()} at ${new Date( createdDate ).toLocaleTimeString()}`}
          {completedDate && <br />}
          {completedDate &&
            `Completed On: ${new Date( completedDate ).toLocaleDateString()} at ${new Date( completedDate ).toLocaleTimeString()}`}
        </div>
      }
      title={ text }
    />
  </Item>
);

export default ListItem;
