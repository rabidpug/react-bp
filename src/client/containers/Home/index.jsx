import { subscribePush, unsubscribePush, } from 'Client/webpush';

import Button from 'Components/Button';
import Card from 'Components/Card';
import React from 'react';
import styled from 'styled-components';
import styles from 'Styles';

const ColourSquare = styled.div`
  flex: 1;
  height: 50px;
  background-color: ${( { colour, } ) => styles.get.colours[colour]};
`;
const ColourContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 50px;
  width: 100%;
`;

const Home = () => (
  <Card>
    <Card.Header>
      <h1>Welcome to React ENFRAMR!</h1>
    </Card.Header>
    <Card.Body>
      <p> A Full Stack React Boilerplate with lots of stuff built in to save me time.</p>
      <ColourContainer>
        <ColourSquare colour='primaryD2' />
        <ColourSquare colour='primaryD1' />
        <ColourSquare colour='primary' />
        <ColourSquare colour='primaryL1' />
        <ColourSquare colour='primaryL2' />
      </ColourContainer>
      <ColourContainer>
        <ColourSquare colour='secondaryD2' />
        <ColourSquare colour='secondaryD1' />
        <ColourSquare colour='secondary' />
        <ColourSquare colour='secondaryL1' />
        <ColourSquare colour='secondaryL2' />
      </ColourContainer>
      <ColourContainer>
        <ColourSquare colour='complementaryD2' />
        <ColourSquare colour='complementaryD1' />
        <ColourSquare colour='complementary' />
        <ColourSquare colour='complementaryL1' />
        <ColourSquare colour='complementaryL2' />
      </ColourContainer>
      <ColourContainer>
        <ColourSquare colour='supplementaryD2' />
        <ColourSquare colour='supplementaryD1' />
        <ColourSquare colour='supplementary' />
        <ColourSquare colour='supplementaryL1' />
        <ColourSquare colour='supplementaryL2' />
      </ColourContainer>
      <ColourContainer>
        <ColourSquare colour='greyD2' />
        <ColourSquare colour='greyD1' />
        <ColourSquare colour='grey' />
        <ColourSquare colour='greyL1' />
        <ColourSquare colour='greyL2' />
      </ColourContainer>
      <ColourContainer>
        <ColourSquare colour='whiteD2' />
        <ColourSquare colour='whiteD1' />
        <ColourSquare colour='white' />
        <ColourSquare colour='whiteL1' />
        <ColourSquare colour='whiteL2' />
      </ColourContainer>
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
