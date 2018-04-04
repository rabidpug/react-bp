import FadeWrap from 'Animations/FadeWrap';
import React from 'react';

const Home = FadeWrap( ( { style, } ) => (
  <div style={ { ...style, } }>
    Welcome to React ENFRAMR! A React Boilerplate with lots of stuff built in to save me time. Lots of things, indeed
  </div>
) );

export default Home;
