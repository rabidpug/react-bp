import createSelector from 'selectorator';

const get = {
  darkerColour       : createSelector( [ 'theme.darkerColour', ] ),
  darkerGreyColour   : createSelector( [ 'theme.darkerGreyColour', ] ),
  lighterColour      : createSelector( [ 'theme.lighterColour', ] ),
  lighterGreyColour  : createSelector( [ 'theme.lighterGreyColour', ] ),
  primaryColour      : createSelector( [ 'theme.primaryColour', ] ),
  primaryGreyColour  : createSelector( [ 'theme.primaryGreyColour', ] ),
  primaryWhiteColour : createSelector( [ 'theme.primaryWhiteColour', ] ),
  scrollBar          : createSelector( [ 'theme.scrollBar', ] ),
};

export default get;
