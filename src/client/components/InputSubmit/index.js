// @flow

import {
  Button,
  Form,
  Input,
} from 'antd';

import React from 'react';

const FormItem = Form.Item;
type Props = {
  label: string,
  onSubmit: Function,
  form: any,
};

const InputSubmit: Function = ( {
  label, onSubmit, form,
}: Props ) => {
  const {
    getFieldDecorator, resetFields, getFieldValue, getFieldError, isFieldTouched,
  } = form;

  const fieldError = isFieldTouched( label ) && getFieldError( label );

  return (
    <Form
      onSubmit={ e => {
        e.preventDefault();

        const value = getFieldValue( label );

        if ( !value.trim() ) return;

        onSubmit( value );

        resetFields();
      } }>
      <FormItem
        help={ fieldError || '' }
        validateStatus={ fieldError ? 'error' : '' }>
        {getFieldDecorator(
          label, { rules: [
            { message  : `Fill me out first!`,
              required : true, },
          ], }
        )( <Input placeholder={ `${label}` } /> )}
      </FormItem>
      <Button
        htmlType='submit'
        type='primary'>
        {label}
      </Button>
    </Form>
  );
};

export default Form.create()( InputSubmit );
