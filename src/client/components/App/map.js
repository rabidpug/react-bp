import { getProfile, linkAuth, redirectedAuthSuccess, } from 'Store/user/actions';

import { getPushSubscription, } from 'Store/user/selectors';
import { isOnline, } from 'Store/ui/actions';

const mapApp = {
  Dispatch: {
    getProfile,
    isOnline,
    linkAuth,
    redirectedAuthSuccess,
  },
  State: state => ( { pushSubscription: getPushSubscription( state ), } ),
};

export default mapApp;
