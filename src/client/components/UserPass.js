import {
  Button,
  Form,
  Icon,
  Input,
} from 'antd';
import React, { Component, } from 'react';

import { Link, } from 'react-router-dom';
import { authEndpointRoute, } from 'Shared/routes';
import axios from 'axios';
import styles from './UserPass.scss';

const { Item, } = Form;

class UserPassRaw extends Component {
  constructor ( props ) {
    super( props );

    this.state = { passValidateStatus : '',
                   userValidateStatus : '', };
  }

  handleSubmit = e => {
    const { onSubmit, form, } = this.props;

    e.preventDefault();

    form.validateFields( (
      err, values
    ) => {
      if ( !err ) onSubmit( values );
    } );
  };

  userCheck = (
    rule, value, callback
  ) => {
    const { buttonLabel, } = this.props;

    if ( value ) {
      this.setState( { userValidateStatus: 'validating', } );

      axios
        .post(
          authEndpointRoute( 'usercheck' ), { username: value, }
        )
        .then( res => {
          if ( res.data.userExists && buttonLabel === 'Register' ) {
            this.setState( { userValidateStatus: 'error', } );

            callback( 'Username already in use' );
          } else if ( !res.data.userExists && buttonLabel === 'Log In' ) {
            this.setState( { userValidateStatus: 'error', } );

            callback( 'Username does not exist' );
          } else {
            this.setState( { userValidateStatus: 'success', } );

            callback();
          }
        } )
        .catch( () => {
          this.setState( { userValidateStatus: 'error', } );

          callback( 'Something went wrong...' );
        } );
    } else {
      this.setState( { userValidateStatus: 'warning', } );

      callback( 'please enter a username' );
    }
  };

  passwordValidator = (
    rule, value, callback
  ) => {
    if ( value ) {
      if ( new RegExp( /[a-z]/ ).test( value ) === false ) {
        this.setState( { passValidateStatus: 'error', } );

        callback( 'Password must contain a lowercase letter' );
      } else if ( new RegExp( /[A-Z]/ ).test( value ) === false ) {
        this.setState( { passValidateStatus: 'error', } );

        callback( 'Password must contain an uppercase letter' );
      } else if ( new RegExp( /[0-9]/ ).test( value ) === false ) {
        this.setState( { passValidateStatus: 'error', } );

        callback( 'Password must contain a number' );
      } else if ( value.length < 8 ) {
        this.setState( { passValidateStatus: 'error', } );

        callback( 'Password must be 8 or more characters.' );
      } else {
        this.setState( { passValidateStatus: 'success', } );

        callback();
      }
    } else {
      this.setState( { passValidateStatus: 'warning', } );

      callback( 'please enter a password' );
    }
  };

  render () {
    const {
      form, buttonLabel, isGettingAuth, authMessage, style,
    } = this.props;
    const { userValidateStatus, passValidateStatus, } = this.state;
    const { getFieldDecorator, } = form;

    return (
      <Form
        className={ styles.loginForm }
        onSubmit={ this.handleSubmit }
        style={ { ...style, } }>
        <h1>{buttonLabel}</h1>
        <Item
          hasFeedback
          validateStatus={ userValidateStatus }>
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
          /> )}
        </Item>
        <Item
          hasFeedback
          validateStatus={ passValidateStatus }>
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
            type='password'
          /> )}
        </Item>
        <Item className={ styles.buttonsGroup }>
          <Button
            className={ styles.loginFormButton }
            htmlType='submit'
            loading={ isGettingAuth }
            type='primary'>
            {buttonLabel}
          </Button>
        </Item>
        <Item className={ styles.buttonsGroup }>
          <Button
            className={ styles.loginFormButton }
            href='api/auth/google'
            htmlType='button'
            icon='google'
            loading={ isGettingAuth }
            type='dashed'>
            {`Sign In With Google`}
          </Button>
          {/* <Item>
          <Button
            className={styles.loginFormButton}
            href='api/auth/facebook'
            htmlType='button'
            icon='facebook'
            loading={ isGettingAuth }
            type='dashed'>
            {`${buttonLabel} With Facebook`}
          </Button>
        </Item> */}
        </Item>
        <Link to={ buttonLabel === 'Register' ? '/login' : '/register' }>{`${
          buttonLabel === 'Register' ? 'Log In' : 'Register'
        } here`}</Link>
        <Item>
          <p>{authMessage}</p>
        </Item>
      </Form>
    );
  }
}

const UserPass = Form.create()( UserPassRaw );

export default UserPass;
