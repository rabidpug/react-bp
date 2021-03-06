import { Checkbox, Form, Icon, Input, } from 'antd';
import React, { Component, } from 'react';
import { faFacebook, faGoogle, } from '@fortawesome/free-brands-svg-icons';

import Button from '../Button';
import { authEndpointRoute, } from 'Shared/routes';
import axios from 'axios';
import { connect, } from 'react-redux';
import gStyles from 'Styles/global';
import { hot, } from 'react-hot-loader';
import map from './map';

const { Item, } = Form;
const { create, } = Form;

@hot( module )
@connect( map.State, map.Dispatch )
@create()
export default class UserForm extends Component {
  constructor ( props ) {
    super( props );

    this.state = {
      confirmDirty : false,
      remember     : JSON.parse( localStorage.getItem( 'remember' ) ),
      userExists   : 'noval',
    };
  }

  componentDidMount () {
    const { remember, } = this.state;

    if ( typeof remember !== 'boolean' ) {
      localStorage.setItem( 'remember', true );

      this.setState( { remember: true, } );
    }
  }

  handleConfirmBlur = e => {
    const { value, } = e.target;
    const { confirmDirty, } = this.state;

    this.setState( { confirmDirty: confirmDirty || !!value, } );
  };

  handleSubmit = e => {
    const { authUser, form, } = this.props;
    const { userExists, } = this.state;

    e.preventDefault();

    form.validateFields( ( err, values ) => {
      const authType = userExists ? 'login' : 'register';

      if ( !err ) {
        authUser( {
          authType,
          values,
        } );
      }
    } );
  };

  userCheck = ( rule, value, callback ) => {
    const { form, } = this.props;

    if ( value ) {
      const reg = /^([0-9]|[a-z]|-|_)*$/;

      if ( reg.test( value ) ) {
        axios
          .post( authEndpointRoute( 'usercheck' ), { username: value, } )
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

  setRemember = remember => localStorage.setItem( 'remember', remember );

  confirmPasswordValidator = ( rule, value, callback ) => {
    const { form, } = this.props;

    if ( value && value !== form.getFieldValue( 'password' ) ) callback( 'Passwords do not match' );
    else if ( value ) callback();
    else callback();
  };

  passwordValidator = ( rule, value, callback ) => {
    const { form, } = this.props;
    const { confirmDirty, } = this.state;

    if ( value && confirmDirty ) form.validateFields( [ 'confirm', ], { force: true, } );

    if ( value ) {
      if ( /[a-z]/.test( value ) === false ) callback( 'Password must contain a lowercase letter' );
      else if ( /[A-Z]/.test( value ) === false ) callback( 'Password must contain an uppercase letter' );
      else if ( /[0-9]/.test( value ) === false ) callback( 'Password must contain a number' );
      else if ( value.length < 8 ) callback( 'Password must be 8 or more characters.' );
      else callback();
    } else callback( 'please enter a password' );
  };

  emailValidator = ( rule, value, callback ) => {
    if ( !value ) callback( 'Email is required' );
    else if ( /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/.test( value ) === false ) callback( 'Enter a valid email address' );
    else callback();
  };

  render () {
    const { form, isGettingAuth, authMessage, } = this.props;
    const { userExists, remember, } = this.state;
    const { getFieldDecorator, } = form;
    const message = userExists === 'noval' ? 'Sign In/Up' : userExists ? 'Sign In' : 'Sign Up';
    const extraMessage =
      userExists === 'noval'
        ? 'Enter your existing username to sign in, or a new username to sign up'
        : userExists
          ? 'Username exists for sign in'
          : 'New username for sign up';

    return (
      <Form
        className={ gStyles.cardStyle }
        onSubmit={ this.handleSubmit }>
        <div className={ gStyles.cardHeader }>
          <h1>{message}</h1>
        </div>
        <div className={ gStyles.cardTop }>
          <Item
            extra={ extraMessage }
            hasFeedback>
            {getFieldDecorator( 'username', {
              rules: [
                { required: true, },
                { validator: this.userCheck, },
              ],
            } )( <Input
              autoComplete='username'
              placeholder='Username'
              prefix={ <Icon
                style={ { color: 'rgba(0,0,0,.25)', } }
                type='user' /> }
              style={ { maxWidth: 500, } }
            /> )}
          </Item>
          <Item hasFeedback>
            {getFieldDecorator( 'password', {
              rules: [
                { required: true, },
                { validator: this.passwordValidator, },
              ],
            } )( <Input
              autoComplete='current-password'
              placeholder='Password'
              prefix={ <Icon
                style={ { color: 'rgba(0,0,0,.25)', } }
                type='lock' /> }
              style={ { maxWidth: 500, } }
              type='password'
            /> )}
          </Item>
          {!userExists && (
            <Item hasFeedback>
              {getFieldDecorator( 'confirm', {
                rules: [
                  { required: true, },
                  { validator: this.confirmPasswordValidator, },
                ],
              } )( <Input
                autoComplete='current-password'
                onBlur={ this.handleConfirmBlur }
                placeholder='Confirm Password'
                prefix={ <Icon
                  style={ { color: 'rgba(0,0,0,.25)', } }
                  type='lock' /> }
                style={ { maxWidth: 500, } }
                type='password'
              /> )}
            </Item>
          )}
          {!userExists && (
            <Item hasFeedback>
              {getFieldDecorator( 'email', {
                rules: [
                  { required: true, },
                  { validator: this.emailValidator, },
                ],
              } )( <Input
                autoComplete='email'
                placeholder='Email Address'
                prefix={ <Icon
                  style={ { color: 'rgba(0,0,0,.25)', } }
                  type='mail' /> }
                style={ { maxWidth: 500, } }
                type='email'
              /> )}
            </Item>
          )}
          {authMessage && (
            <Item className={ gStyles.buttonsGroup }>
              <span>{authMessage}</span>
            </Item>
          )}
        </div>
        <div className={ gStyles.cardBottom }>
          <Item className={ gStyles.buttonsGroup }>
            <Button
              disabled={ isGettingAuth }
              type='submit'
              variant='primary'>
              {message}
            </Button>
          </Item>
          <Item className={ gStyles.buttonsGroup }>
            {getFieldDecorator( 'remember', {
              initialValue  : remember,
              valuePropName : 'checked',
            } )( <Checkbox onChange={ e => this.setRemember( e.target.checked ) }>Remember me</Checkbox> )}
          </Item>
          <Item className={ gStyles.buttonsGroup }>
            <Button
              disabled={ isGettingAuth }
              href={ authEndpointRoute( 'google' ) }
              icon={ faGoogle }
              variant='secondary'>
              Sign In With Google
            </Button>
            <Button
              className={ gStyles.marginMid }
              disabled={ isGettingAuth }
              href={ authEndpointRoute( 'facebook' ) }
              icon={ faFacebook }
              variant='secondary'>
              Sign In With Facebook
            </Button>
          </Item>
        </div>
      </Form>
    );
  }
}
