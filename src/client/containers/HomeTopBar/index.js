// @flow

import TopBar from '../../components/TopBar';
import { connect, } from 'react-redux';
import { toggleSidebar, } from '../../store/ui/actions';

const mapStateToProps = state => ( { actionMenuItems    : state.ui.actionMenuItems,
                                     isSidebarCollapsed : state.ui.isSidebarCollapsed, } );

const mapDispatchToProps = dispatch => ( { toggleSideBar () {
  dispatch( toggleSidebar() );
}, } );

export default connect(
  mapStateToProps, mapDispatchToProps
)( TopBar );
