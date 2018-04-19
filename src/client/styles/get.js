import createSelector from 'selectorator';

const get = {
  darkerColour       : createSelector( [ 'theme.darkerColour', ] ),
  darkerGreyColour   : createSelector( [ 'theme.darkerGreyColour', ] ),
  darkestGreyColour  : createSelector( [ 'theme.darkestGreyColour', ] ),
  hoverColour        : createSelector( [ 'theme.hoverColour', ] ),
  lighterColour      : createSelector( [ 'theme.lighterColour', ] ),
  lighterGreyColour  : createSelector( [ 'theme.lighterGreyColour', ] ),
  midGreyColour      : createSelector( [ 'theme.midGreyColour', ] ),
  primaryColour      : createSelector( [ 'theme.primaryColour', ] ),
  primaryGreyColour  : createSelector( [ 'theme.primaryGreyColour', ] ),
  primaryWhiteColour : createSelector( [ 'theme.primaryWhiteColour', ] ),
  scrollBar          : createSelector( [ 'theme.scrollBar', ] ),
};

export default get;
