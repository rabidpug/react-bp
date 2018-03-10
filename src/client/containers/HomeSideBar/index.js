// @flow

import Sidebar from '../../components/Sidebar';
import { connect, } from 'react-redux';
import { push, } from 'react-router-redux';
import { toggleSidebar, } from '../../store/ui/actions';

const mapStateToProps = state => ( {
  isSidebarCollapsed : state.ui.isSidebarCollapsed,
  menuItems          : state.ui.menuItems,
  router             : state.router,
} );

const mapDispatchToProps = dispatch => ( { goToPath ( path ) {
  dispatch( push( path ) );
},
                                           toggleSideBar () {
    dispatch( toggleSidebar() );
  }, } );

export default connect(
  mapStateToProps, mapDispatchToProps
)( Sidebar );
