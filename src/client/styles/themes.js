import { css, } from 'styled-components';
const main = {
  darkerColour       : '#b44100',
  darkerGreyColour   : '#757575',
  darkestGreyColour  : '#545454',
  hoverColour        : 'rgba(237,112,42,0.4)',
  lighterColour      : '#fa9755',
  lighterGreyColour  : '#fafafa',
  midGreyColour      : '#f1f1f1',
  primaryColour      : '#ed702a',
  primaryGreyColour  : '#cecece',
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
