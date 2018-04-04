import {
  Button, Form, Radio,
} from 'antd';

import React from 'react';
import { authEndpointRoute, } from 'Shared/routes';
import gStyles from 'Styles/global';
import noImage from 'Assets/noImage.png';

const ProfileCard = ( {
  photos, displayNames, emails, style, providers, publicProfile, changePublicProfile,
} ) => {
  const handleClick = () => {
    console.log('book'); //eslint-disable-line
  };

  return (
    <Form
      className={ gStyles.cardStyle }
      style={ { ...style, } }>
      <div className={ gStyles.cardHeader }>
        <h1 style={ {} }>User Profile</h1>
      </div>
      <div className={ gStyles.cardTop }>
        <Form.Item
          colon={ false }
          label='Profile Picture'>
          <Radio.Group value={ publicProfile.photos }>
            <Radio.Button
              onClick={ () => changePublicProfile(
                'photos', 'anonymous'
              ) }
              style={ {
                display : 'inline-block',
                height  : 220,
                padding : 10,
                width   : 220,
              } }
              value='anonymous'>
              <img src={ noImage } />
            </Radio.Button>
            {photos &&
              photos.filter( (
                url, i, arr
              ) => arr.indexOf( url ) === i ).map( url => (
                <Radio.Button
                  key={ url }
                  onClick={ () => changePublicProfile(
                    'photos', url
                  ) }
                  style={ {
                    display : 'inline-block',
                    height  : 220,
                    padding : 10,
                    width   : 220,
                  } }
                  value={ url }>
                  <img src={ url } />
                </Radio.Button>
              ) )}
          </Radio.Group>
        </Form.Item>
        <Form.Item
          colon={ false }
          label='Display Name'>
          <Radio.Group value={ publicProfile.displayNames }>
            <Radio.Button
              onClick={ () => changePublicProfile(
                'displayNames', 'anonymous'
              ) }
              value='anonymous'>
              Anonymous
            </Radio.Button>
            {displayNames &&
              displayNames.filter( (
                name, i, arr
              ) => arr.indexOf( name ) === i ).map( name => (
                <Radio.Button
                  key={ name }
                  onClick={ () => changePublicProfile(
                    'displayNames', name
                  ) }
                  value={ name }>
                  {name}
                </Radio.Button>
              ) )}
          </Radio.Group>
        </Form.Item>
        <Form.Item
          colon={ false }
          label='Email'>
          <Radio.Group value={ publicProfile.emails }>
            <Radio.Button
              onClick={ () => changePublicProfile(
                'emails', 'anonymous'
              ) }
              value='anonymous'>
              Anonymous
            </Radio.Button>
            {emails &&
              emails.filter( (
                email, i, arr
              ) => arr.indexOf( email ) === i ).map( email => (
                <Radio.Button
                  key={ email }
                  onClick={ () => changePublicProfile(
                    'emails', email
                  ) }
                  value={ email }>
                  {email}
                </Radio.Button>
              ) )}
          </Radio.Group>
        </Form.Item>
      </div>
      <div className={ gStyles.cardBottom }>
        <Form.Item className={ gStyles.buttonsGroup }>
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
        </Form.Item>
        <Form.Item className={ gStyles.buttonsGroup }>
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
        </Form.Item>
      </div>
    </Form>
  );
};

export default ProfileCard;
