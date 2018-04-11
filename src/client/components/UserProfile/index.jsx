import { Button, Divider, Form, Icon, Input, Modal, Radio, } from 'antd';
import React, { Component, } from 'react';

import Loading from '../Loading';
import { authEndpointRoute, } from 'Shared/routes';
import { connect, } from 'react-redux';
import gStyles from 'Styles/global';
import mapUserProfile from './map';
import noImage from 'Assets/noImage.png';

const { Item, create, } = Form;
const { Group: RadioGroup, Button: RadioButton, } = Radio;

@connect( mapUserProfile.State, mapUserProfile.Dispatch )
@create()
export default class UserProfile extends Component {
  constructor ( props ) {
    super( props );

    this.state = {
      confirmDirty   : false,
      isModalVisible : false,
    };
  }

  componentDidMount () {
    const { isGettingProfile, doGetProfile, publicProfile, } = this.props;

    !isGettingProfile && !publicProfile && doGetProfile();
  }

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

  handleClick = () => this.setState( { isModalVisible: true, } );

  render () {
    const { photos, displayNames, emails, providers, publicProfile, changePublicProfile, form, } = this.props;
    const { getFieldDecorator, } = form;
    const { isModalVisible, } = this.state;

    return publicProfile ? (
      <Form
        className={ gStyles.cardStyle }
        onSubmit={ this.handleSubmit }>
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
                onClick={ () => changePublicProfile( 'photos', 'anonymous' ) }
                style={ {
                  display : 'inline-block',
                  height  : 120,
                  padding : 10,
                  width   : 120,
                } }
                value='anonymous'>
                <img
                  height='100px'
                  src={ noImage }
                  width='100px' />
              </RadioButton>
              {photos &&
                photos.filter( ( url, i, arr ) => arr.indexOf( url ) === i ).map( url => (
                  <RadioButton
                    key={ url }
                    onClick={ () => changePublicProfile( 'photos', url ) }
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
                onClick={ () => changePublicProfile( 'displayNames', 'anonymous' ) }
                value='anonymous'>
                Anonymous
              </RadioButton>
              {displayNames &&
                displayNames.filter( ( name, i, arr ) => arr.indexOf( name ) === i ).map( name => (
                  <RadioButton
                    key={ name }
                    onClick={ () => changePublicProfile( 'displayNames', name ) }
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
                onClick={ () => changePublicProfile( 'emails', 'anonymous' ) }
                value='anonymous'>
                Anonymous
              </RadioButton>
              {emails &&
                emails.filter( ( email, i, arr ) => arr.indexOf( email ) === i ).map( email => (
                  <RadioButton
                    key={ email }
                    onClick={ () => changePublicProfile( 'emails', email ) }
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
                onClick={ this.handleClick }>
                Change Password
              </Button>
            )}
            {!providers.local && (
              <Button
                className={ gStyles.margin10 }
                onClick={ this.handleClick }>
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
          confirmLoading={ false }
          footer={ null }
          onCancel={ () => this.setState( { isModalVisible: false, } ) }
          title='Change Password'
          visible={ isModalVisible }>
          <Item hasFeedback>
            {getFieldDecorator( 'current', {
              rules: [
                { required: true, },
                { validator: this.currentValidator, },
              ],
            } )( <Input
              autoComplete='current-password'
              placeholder='Current Password'
              prefix={ <Icon
                style={ { color: 'rgba(0,0,0,.25)', } }
                type='lock' /> }
              style={ { maxWidth: 500, } }
              type='password'
            /> )}
          </Item>
          <Item hasFeedback>
            {getFieldDecorator( 'password', {
              rules: [
                { required: true, },
                { validator: this.passwordValidator, },
              ],
            } )( <Input
              autoComplete='new-password'
              placeholder='New Password'
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
              autoComplete='new-password'
              onBlur={ this.handleConfirmBlur }
              placeholder='Confirm New Password'
              prefix={ <Icon
                style={ { color: 'rgba(0,0,0,.25)', } }
                type='lock' /> }
              style={ { maxWidth: 500, } }
              type='password'
            /> )}
          </Item>
          <Item
            className={ gStyles.buttonsGroup }
            style={ { textAlign: 'right', } }>
            <Button
              className={ gStyles.marginMid }
              htmlType='submit'
              type='primary'>
              Submit
            </Button>
          </Item>
        </Modal>
      </Form>
    )
      : <Loading />;
  }
}
