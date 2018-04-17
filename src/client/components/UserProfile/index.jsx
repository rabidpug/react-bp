import { Form, Icon, Input, Modal, } from 'antd';
import React, { Component, } from 'react';
import { faFacebook, faGoogle, } from '@fortawesome/free-brands-svg-icons';

import Button from '../Button';
import Card from '../Card';
import { FontAwesomeIcon, } from '@fortawesome/react-fontawesome';
import Loading from '../Loading';
import RadioButton from '../RadioButton';
import StrikeTitle from '../StrikeTitle';
import { authEndpointRoute, } from 'Shared/routes';
import axios from 'axios';
import { connect, } from 'react-redux';
import { hot, } from 'react-hot-loader';
import mapUserProfile from './map';
import noImage from 'Assets/noImage.png';

const { Body, Container, Footer, Header, } = Card;
const { Item, create, } = Form;

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

  handleChangePublic = e => {
    e.stopPropagation();

    const { target: { checked, value, name: key, }, } = e;
    const { changePublic, } = this.props;

    checked &&
      changePublic( {
        key,
        value,
      } );
  };

  render () {
    const {
      photos,
      displayNames,
      emails,
      providers,
      publicProfile,
      form,
      changePasswordStatus,
      isChangingPublic,
      changingPassword,
      changePasswordResponse,
    } = this.props;
    const { getFieldDecorator, } = form;
    const { changeType, } = this.state;

    return publicProfile ? (
      <Container>
        <Header>
          <h1>User Profile</h1>
        </Header>
        <Body>
          <StrikeTitle>Picture</StrikeTitle>
          <span>
            <RadioButton
              checked={ publicProfile.photos === 'Anonymous' }
              disabled={ isChangingPublic }
              id='photoAnonymous'
              name='photos'
              onChange={ this.handleChangePublic }
              value='Anonymous'>
              <img
                height='100px'
                src={ noImage }
                width='100px' />
            </RadioButton>
            {photos &&
              photos.filter( ( url, i, arr ) => arr.indexOf( url ) === i ).map( url => (
                <RadioButton
                  checked={ publicProfile.photos === url }
                  disabled={ isChangingPublic }
                  id={ url }
                  key={ url }
                  name='photos'
                  onChange={ this.handleChangePublic }
                  value={ url }>
                  <img
                    height='100px'
                    src={ url }
                    width='100px' />
                </RadioButton>
              ) )}
          </span>
          <StrikeTitle>Display Name</StrikeTitle>
          <span>
            <RadioButton
              checked={ publicProfile.displayNames === 'Anonymous' }
              disabled={ isChangingPublic }
              id='displayNamesAnonymous'
              name='displayNames'
              onChange={ this.handleChangePublic }
              value='Anonymous'>
              Anonymous
            </RadioButton>
            {displayNames &&
              displayNames.filter( ( name, i, arr ) => arr.indexOf( name ) === i ).map( name => (
                <RadioButton
                  checked={ publicProfile.displayNames === name }
                  disabled={ isChangingPublic }
                  id={ name }
                  key={ name }
                  name='displayNames'
                  onChange={ this.handleChangePublic }
                  value={ name }>
                  {name}
                </RadioButton>
              ) )}
          </span>
          <StrikeTitle>Email</StrikeTitle>
          <span>
            <RadioButton
              checked={ publicProfile.emails === 'Anonymous' }
              disabled={ isChangingPublic }
              id='emailsAnonymous'
              name='emails'
              onChange={ this.handleChangePublic }
              value='Anonymous'>
              Anonymous
            </RadioButton>
            {emails &&
              emails.filter( ( email, i, arr ) => arr.indexOf( email ) === i ).map( email => (
                <RadioButton
                  checked={ publicProfile.emails === email }
                  disabled={ isChangingPublic }
                  id={ email }
                  key={ email }
                  name='emails'
                  onChange={ this.handleChangePublic }
                  value={ email }>
                  {email}
                </RadioButton>
              ) )}
          </span>
        </Body>
        <Footer>
          {providers.local && (
            <Button
              onClick={ this.handleClickChange }
              variant='primary'>
              Change Password
            </Button>
          )}
          {!providers.local && (
            <Button
              onClick={ this.handleClickCreate }
              variant='primary'>
              Create Username & Password
            </Button>
          )}
          <br />
          {!providers.google && (
            <Button
              href={ authEndpointRoute( 'google' ) }
              variant='secondary'>
              <FontAwesomeIcon icon={ faGoogle } /> Link With Google
            </Button>
          )}
          {!providers.facebook && (
            <Button
              href={ authEndpointRoute( 'facebook' ) }
              variant='secondary'>
              <FontAwesomeIcon icon={ faFacebook } /> Link With Facebook
            </Button>
          )}
        </Footer>
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
      </Container>
    )
      : <Loading />;
  }
}
