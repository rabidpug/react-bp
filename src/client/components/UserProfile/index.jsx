import { Button, Divider, Form, Icon, Input, Modal, Radio, } from 'antd';
import React, { Component, } from 'react';

import Loading from '../Loading';
import { authEndpointRoute, } from 'Shared/routes';
import axios from 'axios';
import { connect, } from 'react-redux';
import gStyles from 'Styles/global';
import { hot, } from 'react-hot-loader';
import mapUserProfile from './map';
import noImage from 'Assets/noImage.png';

const { Item, create, } = Form;
const { Group: RadioGroup, Button: RadioButton, } = Radio;

@hot( module )
@connect( mapUserProfile.State, mapUserProfile.Dispatch )
@create()
export default class UserProfile extends Component {
  constructor ( props ) {
    super( props );

    this.state = {
      changeType   : false,
      confirmDirty : false,
    };
  }

  componentDidMount () {
    const { isGettingProfile, getProfile, } = this.props;

    !isGettingProfile && getProfile();
  }

  handleSubmit = e => {
    const { changePassword, form, } = this.props;
    const { changeType, } = this.state;

    e.preventDefault();

    form.validateFields( ( err, values ) => {
      if ( !err ) {
        changePassword( {
          changeType,
          values,
        } );
      }
    } );
  };

  handleConfirmBlur = e => {
    const { value, } = e.target;
    const { confirmDirty, } = this.state;

    this.setState( { confirmDirty: confirmDirty || !!value, } );
  };

  confirmPasswordValidator = ( rule, value, callback ) => {
    const { form, } = this.props;

    if ( value && value !== form.getFieldValue( 'password' ) ) callback( 'Passwords do not match' );
    else if ( value ) callback();
    else callback();
  };

  currentValidator = ( rule, value, callback ) => {
    const { form, } = this.props;
    const { changeType, } = this.state;

    if ( value && changeType === 'change' ) form.validateFields( [ 'password', ], { force: true, } );
    if ( value ) {
      if ( /[a-z]/.test( value ) === false ) callback( 'Password must contain a lowercase letter' );
      else if ( /[A-Z]/.test( value ) === false ) callback( 'Password must contain an uppercase letter' );
      else if ( /[0-9]/.test( value ) === false ) callback( 'Password must contain a number' );
      else if ( value.length < 8 ) callback( 'Password must be 8 or more characters.' );
      else callback();
    } else callback( 'please enter a password' );
  };

  passwordValidator = ( rule, value, callback ) => {
    const { form, } = this.props;
    const { confirmDirty, changeType, } = this.state;

    if ( value && confirmDirty ) form.validateFields( [ 'confirm', ], { force: true, } );
    if ( changeType === 'change' && value && value === form.getFieldValue( 'current' ) ) callback( 'New password must not match current password' );
    if ( value ) {
      if ( /[a-z]/.test( value ) === false ) callback( 'Password must contain a lowercase letter' );
      else if ( /[A-Z]/.test( value ) === false ) callback( 'Password must contain an uppercase letter' );
      else if ( /[0-9]/.test( value ) === false ) callback( 'Password must contain a number' );
      else if ( value.length < 8 ) callback( 'Password must be 8 or more characters.' );
      else callback();
    } else callback( 'please enter a password' );
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

              if ( userExists ) callback( 'Username is already in use' );
              else callback();
            } else {
              this.setState( { userExists: 'noval', } );

              callback( 'please enter a username' );
            }
          } )
          .catch( () => {
            callback( 'Network error' );
          } );
      } else callback( 'Username must be lowercase letters, numbers, _ and - only' );
    } else callback( 'please enter a username' );
  };

  handleClickCreate = () => this.setState( { changeType: 'create', } );

  handleClickChange = () => this.setState( { changeType: 'change', } );

  render () {
    const {
      photos,
      displayNames,
      emails,
      providers,
      publicProfile,
      changePublic,
      form,
      changePasswordStatus,
      changingPassword,
      changePasswordResponse,
    } = this.props;
    const { getFieldDecorator, } = form;
    const { changeType, } = this.state;

    return publicProfile ? (
      <div className={ gStyles.cardStyle }>
        <div className={ gStyles.cardHeader }>
          <h1>User Profile</h1>
        </div>
        <div className={ gStyles.cardTop }>
          <Item
            className={ gStyles.itemLabel }
            colon={ false }
            label={ <Divider style={ { marginBottom: 0, } }>Profile Picture</Divider> }>
            <RadioGroup value={ publicProfile.photos }>
              <RadioButton
                onClick={ () =>
                  changePublic( {
                    key   : 'photos',
                    value : 'Anonymous',
                  } )
                }
                style={ {
                  display : 'inline-block',
                  height  : 120,
                  padding : 10,
                  width   : 120,
                } }
                value='Anonymous'>
                <img
                  height='100px'
                  src={ noImage }
                  width='100px' />
              </RadioButton>
              {photos &&
                photos.filter( ( url, i, arr ) => arr.indexOf( url ) === i ).map( url => (
                  <RadioButton
                    key={ url }
                    onClick={ () =>
                      changePublic( {
                        key   : 'photos',
                        value : url,
                      } )
                    }
                    style={ {
                      display : 'inline-block',
                      height  : 120,
                      padding : 10,
                      width   : 120,
                    } }
                    value={ url }>
                    <img
                      height='100px'
                      src={ url }
                      width='100px' />
                  </RadioButton>
                ) )}
            </RadioGroup>
          </Item>
          <Item
            className={ gStyles.itemLabel }
            colon={ false }
            label={ <Divider style={ { marginBottom: 0, } }>Display Name</Divider> }>
            <RadioGroup value={ publicProfile.displayNames }>
              <RadioButton
                onClick={ () =>
                  changePublic( {
                    key   : 'displayNames',
                    value : 'Anonymous',
                  } )
                }
                value='Anonymous'>
                Anonymous
              </RadioButton>
              {displayNames &&
                displayNames.filter( ( name, i, arr ) => arr.indexOf( name ) === i ).map( name => (
                  <RadioButton
                    key={ name }
                    onClick={ () =>
                      changePublic( {
                        key   : 'displayNames',
                        value : name,
                      } )
                    }
                    value={ name }>
                    {name}
                  </RadioButton>
                ) )}
            </RadioGroup>
          </Item>
          <Item
            className={ gStyles.itemLabel }
            colon={ false }
            label={ <Divider style={ { marginBottom: 0, } }>Email</Divider> }>
            <RadioGroup value={ publicProfile.emails }>
              <RadioButton
                onClick={ () =>
                  changePublic( {
                    key   : 'emails',
                    value : 'Anonymous',
                  } )
                }
                value='Anonymous'>
                Anonymous
              </RadioButton>
              {emails &&
                emails.filter( ( email, i, arr ) => arr.indexOf( email ) === i ).map( email => (
                  <RadioButton
                    key={ email }
                    onClick={ () =>
                      changePublic( {
                        key   : 'emails',
                        value : email,
                      } )
                    }
                    value={ email }>
                    {email}
                  </RadioButton>
                ) )}
            </RadioGroup>
          </Item>
        </div>
        <div className={ gStyles.cardBottom }>
          <Item className={ gStyles.buttonsGroup }>
            {providers.local && (
              <Button
                className={ gStyles.margin10 }
                onClick={ this.handleClickChange }>
                Change Password
              </Button>
            )}
            {!providers.local && (
              <Button
                className={ gStyles.margin10 }
                onClick={ this.handleClickCreate }>
                Create Username & Password
              </Button>
            )}
          </Item>
          <Item className={ gStyles.buttonsGroup }>
            {!providers.google && (
              <Button
                className={ gStyles.marginMid }
                href={ authEndpointRoute( 'google' ) }
                htmlType='button'
                icon='google'
                type='dashed'>
                {'Link With Google'}
              </Button>
            )}
            {!providers.facebook && (
              <Button
                className={ gStyles.marginMid }
                href={ authEndpointRoute( 'facebook' ) }
                htmlType='button'
                icon='facebook'
                type='dashed'>
                {'Link With Facebook'}
              </Button>
            )}
          </Item>
        </div>
        <Modal
          footer={ null }
          onCancel={ () => {
            this.setState( { changeType: false, } );

            changePasswordResponse( {} );

            form.resetFields();
          } }
          title={
            changeType === 'change' ? 'Change Password' : changeType === 'create' ? 'Create Username and Password' : ''
          }
          visible={ !!changeType }>
          {changeType && (
            <Form onSubmit={ this.handleSubmit }>
              <Item hasFeedback>
                {getFieldDecorator( changeType === 'change' ? 'current' : 'username', {
                  rules: [
                    { required: true, },
                    { validator: changeType === 'change' ? this.currentValidator : this.userCheck, },
                  ],
                } )( <Input
                  autoComplete={ changeType === 'change' ? 'current-password' : 'username' }
                  placeholder={ changeType === 'change' ? 'Current Password' : 'Username' }
                  prefix={ <Icon
                    style={ { color: 'rgba(0,0,0,.25)', } }
                    type='lock' /> }
                  style={ { maxWidth: 500, } }
                  type={ changeType === 'change' ? 'password' : 'text' }
                /> )}
              </Item>
              <Item hasFeedback>
                {getFieldDecorator( 'password', {
                  rules: [
                    { required: true, },
                    { validator: this.passwordValidator, },
                  ],
                } )( <Input
                  autoComplete={ changeType === 'change' ? 'new-password' : 'current-password' }
                  placeholder={ changeType === 'change' ? 'New Password' : 'Password' }
                  prefix={ <Icon
                    style={ { color: 'rgba(0,0,0,.25)', } }
                    type='lock' /> }
                  style={ { maxWidth: 500, } }
                  type='password'
                /> )}
              </Item>
              <Item hasFeedback>
                {getFieldDecorator( 'confirm', {
                  rules: [
                    { required: true, },
                    { validator: this.confirmPasswordValidator, },
                  ],
                } )( <Input
                  autoComplete={ changeType === 'change' ? 'new-password' : 'current-password' }
                  onBlur={ this.handleConfirmBlur }
                  placeholder={ changeType === 'change' ? 'Confirm New Password' : 'Confirm Password' }
                  prefix={ <Icon
                    style={ { color: 'rgba(0,0,0,.25)', } }
                    type='lock' /> }
                  style={ { maxWidth: 500, } }
                  type='password'
                /> )}
              </Item>
              <p>{changePasswordStatus}</p>
              <Item style={ { textAlign: 'right', } }>
                <Button
                  htmlType='submit'
                  loading={ changingPassword }
                  type='primary'>
                  Submit
                </Button>
              </Item>
            </Form>
          )}
        </Modal>
      </div>
    )
      : <Loading />;
  }
}
