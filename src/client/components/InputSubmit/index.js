// @flow

import { Button, Form, } from 'semantic-ui-react';

import React from 'react';

type Props = {
  label: string,
  onSubmit: Function,
};

const InputSubmit: Function = ( { label, onSubmit, }: Props ) => {
  let input;

  return (
    <Form
      onSubmit={ e => {
        e.preventDefault();

        if ( !input || !input.value.trim() ) return;

        onSubmit( input.value );

        input.value = '';
      } }>
      <Form.Field>
        <input
          ref={ node => {
            input = node;
          } }
        />
      </Form.Field>
      <Button type='submit'>{label}</Button>
    </Form>
  );
};

export default InputSubmit;
