import {
  Button,
  Card,
  Form,
  Radio,
} from 'antd';

import React from 'react';
import { authEndpointRoute, } from 'Shared/routes';
import gStyles from 'Styles/global';
import noImage from 'Assets/noImage.png';

const ProfileCard = ( {
  photos, displayNames, emails, style, providers,
} ) => {
  const handleClick = () => {
    console.log('book'); //eslint-disable-line
  };

  return (
    <Card
      className={ gStyles.cardStyle }
      style={ {
        margin    : 'auto',
        marginTop : 50,
        maxWidth  : 500,
        minWidth  : 200,
        ...style,
      } }>
      <Form>
        <Form.Item label='Public Profile Picture'>
          <Radio.Group defaultValue={ false }>
            <Radio.Button
              style={ {
                display : 'inline-block',
                height  : 220,
                padding : 10,
                width   : 220,
              } }
              value={ false }>
              <img src={ noImage } />
            </Radio.Button>
            {photos &&
              photos.filter( (
                url, i, arr
              ) => arr.indexOf( url ) === i ).map( url => (
                <Radio.Button
                  key={ url }
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
        <Form.Item label='Public Display Name'>
          <Radio.Group defaultValue={ false }>
            <Radio.Button value={ false }>Anonymous</Radio.Button>
            {displayNames &&
              displayNames.filter( (
                name, i, arr
              ) => arr.indexOf( name ) === i ).map( name => (
                <Radio.Button
                  key={ name }
                  value={ name }>
                  {name}
                </Radio.Button>
              ) )}
          </Radio.Group>
        </Form.Item>
        <Form.Item label='Public Email'>
          <Radio.Group defaultValue={ false }>
            <Radio.Button value={ false }>Anonymous</Radio.Button>
            {emails &&
              emails.filter( (
                email, i, arr
              ) => arr.indexOf( email ) === i ).map( email => (
                <Radio.Button
                  key={ email }
                  value={ email }>
                  {email}
                </Radio.Button>
              ) )}
          </Radio.Group>
        </Form.Item>
      </Form>
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

      <br />
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
    </Card>
  );
};

export default ProfileCard;
