import { css, } from 'styled-components';
const main = {
  darkerColour       : '#b44100',
  darkerGreyColour   : '#808080',
  lighterColour      : '#ffa158',
  lighterGreyColour  : '#fafafa',
  primaryColour      : '#ed702a',
  primaryGreyColour  : '#f1f2f4',
  primaryWhiteColour : '#f5f5f5',
  scrollBar          : css`
    &::-webkit-scrollbar-track {
      background-color: #f5f5f5;
      border-radius: 10px;
      box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    }

    &::-webkit-scrollbar {
      background-color: #f5f5f5;
      width: 0.5rem;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #555;
      border-radius: 10px;
      box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    }
  `,
};
const themes = { main, };

export default themes;
