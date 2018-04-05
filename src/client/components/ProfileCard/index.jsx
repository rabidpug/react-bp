import {
  Button,
  Divider,
  Form,
  Radio,
} from 'antd';

import React from 'react';
import { authEndpointRoute, } from 'Shared/routes';
import gStyles from 'Styles/global';
import noImage from 'Assets/noImage.png';

const { Item, } = Form;
const { Group: RadioGroup, Button: RadioButton, } = Radio;
const ProfileCard = ( {
  photos, displayNames, emails, style, providers, publicProfile, changePublicProfile,
} ) => {
  const handleClick = () => {
    console.log('I will do stuff'); //eslint-disable-line
  };

  return (
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
              onClick={ handleClick }>
              Change Password
            </Button>
          )}
          {!providers.local && (
            <Button
              className={ gStyles.margin10 }
              onClick={ handleClick }>
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
    </Form>
  );
};

export default ProfileCard;
