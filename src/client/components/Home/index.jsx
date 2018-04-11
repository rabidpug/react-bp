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
  </div>
);

export default Home;
