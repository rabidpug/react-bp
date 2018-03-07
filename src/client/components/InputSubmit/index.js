// @flow

import React from 'react';

type Props = {
  label: string,
  onSubmit: Function
};

const InputSubmit: Function = ( { label, onSubmit, }: Props ) => {
  let input;

  return ( <div>
    <form
      onSubmit={ e => {
        e.preventDefault();

        if ( !input || !input.value.trim() ) return;

        onSubmit( input.value );

        input.value = '';
      } }
    >
      <input
        ref={ node => {
          input = node;
        } }
      />
      <button type='submit'>
        {label}
      </button>
    </form>
  </div> );
};

export default InputSubmit;
