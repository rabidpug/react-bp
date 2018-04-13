import { Button, Form, Input, } from 'antd';
import React, { Component, } from 'react';

import { connect, } from 'react-redux';
import mapSendMessage from './map';

const { Item, } = Form;
const { TextArea, } = Input;
const { create, } = Form;

@connect( mapSendMessage.State, mapSendMessage.Dispatch )
@create()
export default class SendMessage extends Component {
  handleSubmit = e => {
    const { form, sendMessage, } = this.props;

    e && e.preventDefault();

    form.validateFields( ( err, values ) => {
      if ( !err && values.message ) {
        sendMessage( values );

        form.resetFields();
      }
    } );
  };

  handleEnter = e => {
    const { shiftKey, } = e;

    if ( !shiftKey ) {
      e.preventDefault();

      this.handleSubmit();
    }
  };

  render () {
    const { form: { getFieldDecorator, loading, }, } = this.props;

    return (
      <Form
        onSubmit={ this.handleSubmit }
        style={ {
          display       : 'flex',
          flexDirection : 'row',
        } }>
        <Item
          hasFeedback={ false }
          style={ {
            flex   : 1,
            margin : 10,
          } }>
          {getFieldDecorator( 'message' )( <TextArea
            autosize={ {
              maxRows : 4,
              minRows : 1,
            } }
            onPressEnter={ this.handleEnter }
            style={ { minHeight: 34, } }
          /> )}
        </Item>
        <Item
          style={ {
            margin       : 10,
            marginBottom : 'auto',
            marginTop    : 'auto',
          } }>
          <Button
            htmlType='submit'
            icon='message'
            loading={ loading }
            type='primary'>
            Send
          </Button>
        </Item>
      </Form>
    );
  }
}
