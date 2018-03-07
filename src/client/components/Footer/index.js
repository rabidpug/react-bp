// @flow

import FilterLink from '../../containers/FilterLink';
import React from 'react';
import { VisibilityFilters, } from '../../store/todoVisibility/types';

const Footer: Function = () => (
  <p>
    {'Show: '}
    <FilterLink filter={ VisibilityFilters.SHOW_ALL }>
      {'All'}
    </FilterLink>
    {', '}
    <FilterLink filter={ VisibilityFilters.SHOW_ACTIVE }>
      {'Active'}
    </FilterLink>
    {', '}
    <FilterLink filter={ VisibilityFilters.SHOW_COMPLETED }>
      {'Completed'}
    </FilterLink>
  </p>
);

export default Footer;

