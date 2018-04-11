import {
  Button,
  Divider,
  Form,
  Modal,
  Radio,
} from 'antd';
import React, { Component, } from 'react';

import Loading from '../Loading';
import { authEndpointRoute, } from 'Shared/routes';
import { connect, } from 'react-redux';
import gStyles from 'Styles/global';
import mapUserProfile from './map';
import noImage from 'Assets/noImage.png';

const { Item, } = Form;
const { Group: RadioGroup, Button: RadioButton, } = Radio;

@connect(
  mapUserProfile.State, mapUserProfile.Dispatch
)
export default class UserProfile extends Component {
  constructor ( props ) {
    super( props );

    this.state = { isModalVisible: false, };
  }

  componentDidMount () {
    const {
      isGettingProfile, doGetProfile, publicProfile,
    } = this.props;

    !isGettingProfile && !publicProfile && doGetProfile();
  }

  handleClick = () => this.setState( { isModalVisible: true, } );

  render () {
    const {
      photos, displayNames, emails, style, providers, publicProfile, changePublicProfile,
    } = this.props;
    const { isModalVisible, } = this.state;

    return publicProfile ? (
      <Form
        className={ gStyles.cardStyle }
        style={ { ...style, } }>
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
                onClick={ () => changePublicProfile(
                  'photos', 'anonymous'
                ) }
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
                photos.filter( (
                  url, i, arr
                ) => arr.indexOf( url ) === i ).map( url => (
                  <RadioButton
                    key={ url }
                    onClick={ () => changePublicProfile(
                      'photos', url
                    ) }
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
                onClick={ () => changePublicProfile(
                  'displayNames', 'anonymous'
                ) }
                value='anonymous'>
                Anonymous
              </RadioButton>
              {displayNames &&
                displayNames.filter( (
                  name, i, arr
                ) => arr.indexOf( name ) === i ).map( name => (
                  <RadioButton
                    key={ name }
                    onClick={ () => changePublicProfile(
                      'displayNames', name
                    ) }
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
                onClick={ () => changePublicProfile(
                  'emails', 'anonymous'
                ) }
                value='anonymous'>
                Anonymous
              </RadioButton>
              {emails &&
                emails.filter( (
                  email, i, arr
                ) => arr.indexOf( email ) === i ).map( email => (
                  <RadioButton
                    key={ email }
                    onClick={ () => changePublicProfile(
                      'emails', email
                    ) }
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
          title='Title'
          visible={ isModalVisible }>
          <p>coming soon</p>
        </Modal>
      </Form>
    )
      : <Loading />;
  }
}