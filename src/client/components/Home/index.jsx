import { subscribePush, unsubscribePush, } from 'Client/webpush';

import { Button, } from 'antd';
import React from 'react';
import gStyles from 'Styles/global';

const Home = () => (
  <div className={ gStyles.cardStyle }>
    <div className={ gStyles.cardHeader }>
      <h1>Welcome to React ENFRAMR!</h1>
    </div>
    <div className={ gStyles.cardTop }>
      <p> A Full Stack React Boilerplate with lots of stuff built in to save me time.</p>
    </div>
    <div className={ gStyles.cardBottom }>
      <Button
        onClick={ subscribePush }
        type='primary'>
        Subscribe
      </Button>
      <Button
        onClick={ unsubscribePush }
        type='secondary'>
        Unsubscribe
      </Button>
    </div>
  </div>
);

export default Home;
