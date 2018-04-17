import { subscribePush, unsubscribePush, } from 'Client/webpush';

import Button from 'Components/Button';
import Card from 'Components/Card';
import React from 'react';

const { Container, Header, Body, Footer, } = Card;
const Home = () => (
  <Container>
    <Header>
      <h1>Welcome to React ENFRAMR!</h1>
    </Header>
    <Body>
      <p> A Full Stack React Boilerplate with lots of stuff built in to save me time.</p>
    </Body>
    <Footer>
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
    </Footer>
  </Container>
);

export default Home;
