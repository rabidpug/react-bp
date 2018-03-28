import {
  Button,
  Form,
  Icon,
  Input,
} from 'antd';

import React from 'react';

const { Item, } = Form;
const UserPassRaw = ( {
  form, handleSubmit, buttonLabel, isGettingAuth, authMessage,
} ) => {
  const { getFieldDecorator, } = form;
  const onSubmit = e => {
    e.preventDefault();

    form.validateFields( (
      err, values
    ) => {
      if ( !err ) handleSubmit( values );
    } );
  };

  return (
    <Form
      className='login-form'
      onSubmit={ onSubmit }>
      <Item>
        {getFieldDecorator(
          'username', { rules: [
            { message  : 'Please input your Username!',
              required : true, },
          ], }
        )( <Input
          placeholder='Username'
          prefix={ <Icon
            style={ { color: 'rgba(0,0,0,.25)', } }
            type='user' /> } /> )}
      </Item>
      <Item>
        {getFieldDecorator(
          'password', { rules: [
            { message  : 'Please input your Password!',
              required : true, },
          ], }
        )( <Input
          placeholder='Password'
          prefix={ <Icon
            style={ { color: 'rgba(0,0,0,.25)', } }
            type='lock' /> }
          type='password'
        /> )}
      </Item>
      <Item>
        <Button
          className='login-form-button'
          htmlType='submit'
          loading={ isGettingAuth }
          type='primary'>
          {buttonLabel}
        </Button>
        <p>{authMessage}</p>
      </Item>
    </Form>
  );
};

const UserPass = Form.create()( UserPassRaw );

export default UserPass;
