import {
  Button,
  Form,
  Icon,
  Input,
} from 'antd';
import React, { Component, } from 'react';

import { authEndpointRoute, } from 'Shared/routes';
import axios from 'axios';
import gStyles from 'Styles/global';

const { Item, } = Form;

class UserPassRaw extends Component {
  constructor ( props ) {
    super( props );

    this.state = { confirmDirty : false,
                   userExists   : 'noval', };
  }

  handleConfirmBlur = e => {
    const { value, } = e.target;
    const { confirmDirty, } = this.state;

    this.setState( { confirmDirty: confirmDirty || !!value, } );
  };

  handleSubmit = e => {
    const { onSubmit, form, } = this.props;
    const { userExists, } = this.state;

    e.preventDefault();

    form.validateFields( (
      err, values
    ) => {
      const authType = userExists ? 'login' : 'register';

      if ( !err ) {
        onSubmit(
          values, authType
        );
      }
    } );
  };

  userCheck = (
    rule, value, callback
  ) => {
    const { form, } = this.props;

    if ( value ) {
      const reg = /^([0-9]|[a-z]|-|_)*$/;

      if ( reg.test( value ) ) {
        axios
          .post(
            authEndpointRoute( 'usercheck' ), { username: value, }
          )
          .then( res => {
            if ( form.getFieldValue( 'username' ) ) {
              const { userExists, } = res.data;

              this.setState( { userExists, } );

              callback();
            } else {
              this.setState( { userExists: 'noval', } );

              callback( 'please enter a username' );
            }
          } )
          .catch( () => {
            callback( 'Network error' );
          } );
      } else callback( 'Username must be lowercase letters, numbers, _ and - only' );
    } else {
      this.setState( { userExists: 'noval', } );

      callback( 'please enter a username' );
    }
  };

  confirmPasswordValidator = (
    rule, value, callback
  ) => {
    const { form, } = this.props;

    if ( value && value !== form.getFieldValue( 'password' ) ) callback( 'Passwords do not match' );
    else if ( value ) callback();
    else callback();
  };

  passwordValidator = (
    rule, value, callback
  ) => {
    const { form, } = this.props;
    const { confirmDirty, } = this.state;

    if ( value && confirmDirty ) {
      form.validateFields(
        [ 'confirm', ], { force: true, }
      );
    }

    if ( value ) {
      if ( /[a-z]/.test( value ) === false ) callback( 'Password must contain a lowercase letter' );
      else if ( /[A-Z]/.test( value ) === false ) callback( 'Password must contain an uppercase letter' );
      else if ( /[0-9]/.test( value ) === false ) callback( 'Password must contain a number' );
      else if ( value.length < 8 ) callback( 'Password must be 8 or more characters.' );
      else callback();
    } else callback( 'please enter a password' );
  };

  render () {
    const {
      form, isGettingAuth, authMessage, style,
    } = this.props;
    const { userExists, } = this.state;
    const { getFieldDecorator, } = form;
    const message = userExists === 'noval' ? 'Sign In/Up' : userExists ? 'Sign In' : 'Sign Up';
    const extraMessage =
      userExists === 'noval'
        ? 'Enter your existing username to sign in, or a new username to sign up'
        : userExists ? 'Username exists for sign in' : 'New username for sign up';

    return (
      <Form
        className={ gStyles.cardStyle }
        onSubmit={ this.handleSubmit }
        style={ { ...style, } }>
        <div className={ gStyles.cardHeader }>
          <h1>{message}</h1>
        </div>
        <div className={ gStyles.cardTop }>
          <Item
            extra={ extraMessage }
            hasFeedback>
            {getFieldDecorator(
              'username', { rules: [
                { required: true, },
                { validator: this.userCheck, },
              ], }
            )( <Input
              autoComplete='username'
              placeholder='Username'
              prefix={ <Icon
                style={ { color: 'rgba(0,0,0,.25)', } }
                type='user' /> }
              style={ { maxWidth: '50%', } }
            /> )}
          </Item>
          <Item hasFeedback>
            {getFieldDecorator(
              'password', { rules: [
                { required: true, },
                { validator: this.passwordValidator, },
              ], }
            )( <Input
              autoComplete='current-password'
              placeholder='Password'
              prefix={ <Icon
                style={ { color: 'rgba(0,0,0,.25)', } }
                type='lock' /> }
              style={ { maxWidth: '50%', } }
              type='password'
            /> )}
          </Item>
          {!userExists && (
            <Item hasFeedback>
              {getFieldDecorator(
                'confirm', { rules: [
                  { required: true, },
                  { validator: this.confirmPasswordValidator, },
                ], }
              )( <Input
                autoComplete='current-password'
                onBlur={ this.handleConfirmBlur }
                placeholder='Confirm Password'
                prefix={ <Icon
                  style={ { color: 'rgba(0,0,0,.25)', } }
                  type='lock' /> }
                style={ { maxWidth: '50%', } }
                type='password'
              /> )}
            </Item>
          )}
        </div>
        <div className={ gStyles.cardBottom }>
          <Item className={ gStyles.buttonsGroup }>
            <Button
              className={ gStyles.marginMid }
              htmlType='submit'
              loading={ isGettingAuth }
              type='primary'>
              {message}
            </Button>
          </Item>
          {authMessage && (
            <Item>
              <p>{authMessage}</p>
            </Item>
          )}
          <Item className={ gStyles.buttonsGroup }>
            <Button
              className={ gStyles.marginMid }
              href='api/auth/google'
              htmlType='button'
              icon='google'
              loading={ isGettingAuth }
              type='dashed'>
              {'Sign In With Google'}
            </Button>
            <Button
              className={ gStyles.marginMid }
              href='api/auth/facebook'
              htmlType='button'
              icon='facebook'
              loading={ isGettingAuth }
              type='dashed'>
              {'Sign In With Facebook'}
            </Button>
          </Item>
        </div>
      </Form>
    );
  }
}

const UserPass = Form.create()( UserPassRaw );

export default UserPass;
