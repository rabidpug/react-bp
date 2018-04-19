import { subscribePush, unsubscribePush, } from 'Client/webpush';

import Button from 'Components/Button';
import Card from 'Components/Card';
import React from 'react';

const Home = () => (
  <Card>
    <Card.Header>
      <h1>Welcome to React ENFRAMR!</h1>
    </Card.Header>
    <Card.Body>
      <p> A Full Stack React Boilerplate with lots of stuff built in to save me time.</p>
    </Card.Body>
    <Card.Footer>
      <Button
        onClick={ subscribePush }
        variant='primary'>
        Subscribe
      </Button>
      <Button
        onClick={ unsubscribePush }
        variant='secondary'>
        Unsubscribe
      </Button>
    </Card.Footer>
  </Card>
);

export default Home;
