// @flow

import { getIsOnline, getIsSidebarCollapsed, } from 'Store/ui/selectors';

import SlideWrap from 'Animations/SlideWrap';
import TopBar from 'Components/TopBar';
import { connect, } from 'react-redux';
import { getIsAuthenticated, } from 'Store/user/selectors';
import { toggleSidebar, } from 'Store/ui/actions';

const mapStateToProps = (
  state, ownProps
) => ( {
  actionMenuItems    : ownProps.route.actionMenuItems,
  isAuthenticated    : getIsAuthenticated( state ),
  isOnline           : getIsOnline( state ),
  isSidebarCollapsed : getIsSidebarCollapsed( state ),
  selectedActionKeys : [],
} );

const mapDispatchToProps = dispatch => ( { toggleSideBar: () => dispatch( toggleSidebar() ), } );

const HomeTopBar = connect(
  mapStateToProps, mapDispatchToProps
)( SlideWrap( TopBar ) );

export default HomeTopBar;
