import styled from 'styled-components';
const Layout = {
  Container: styled.div`
    display: flex;
    flex-direction: ${( { parent, } ) => parent ? 'row' : 'column'};
    flex: auto;
    box-sizing: border-box;
    height: 100vh;
    position: relative;
  `,
  Content: styled.div`
    overflow: auto;
    padding: 0.75rem 0.5rem;
    flex: auto;
    box-sizing: border-box;
    background: radial-gradient(
          1.5em 6.28571em at 1.95em,
          rgba(255, 255, 255, 0) 50%,
          rgba(255, 255, 255, 0.25) 50%,
          rgba(255, 255, 255, 0.25) 55%,
          rgba(255, 255, 255, 0) 55%
        )
        0 0,
      radial-gradient(
          1.5em 6.28571em at -0.45em,
          rgba(255, 255, 255, 0) 50%,
          rgba(255, 255, 255, 0.25) 50%,
          rgba(255, 255, 255, 0.25) 55%,
          rgba(255, 255, 255, 0) 55%
        )
        1.5em 5.5em,
      radial-gradient(
          2.3em 4.57143em at 2.99em,
          rgba(255, 255, 255, 0) 50%,
          rgba(255, 255, 255, 0.3) 50%,
          rgba(255, 255, 255, 0.3) 55%,
          rgba(255, 255, 255, 0) 55%
        )
        0 0,
      radial-gradient(
          2.3em 4.57143em at -0.69em,
          rgba(255, 255, 255, 0) 50%,
          rgba(255, 255, 255, 0.3) 50%,
          rgba(255, 255, 255, 0.3) 55%,
          rgba(255, 255, 255, 0) 55%
        )
        2.3em 4em,
      radial-gradient(
          3.5em 6.28571em at 4.55em,
          rgba(255, 255, 255, 0) 50%,
          rgba(255, 255, 255, 0.25) 50%,
          rgba(255, 255, 255, 0.25) 55%,
          rgba(255, 255, 255, 0) 55%
        )
        0 0,
      radial-gradient(
          3.5em 6.28571em at -1.05em,
          rgba(255, 255, 255, 0) 50%,
          rgba(255, 255, 255, 0.25) 50%,
          rgba(255, 255, 255, 0.25) 55%,
          rgba(255, 255, 255, 0) 55%
        )
        3.5em 5.5em,
      radial-gradient(#e5e5e5, #fff);
    background-color: #e5e5e5;
    background-repeat: repeat;
    background-size: 1.5em 11em, 1.5em 11em, 2.3em 8em, 2.3em 8em, 3.5em 11em, 3.5em 11em, 100% 100%;
    display: flex;
    flex-direction: column;
    position: relative;
    height: 100%;
    width: 100%;
    @media (max-width: 767.98px) {
      padding: 0;
    }
  `,
};

export default Layout;
