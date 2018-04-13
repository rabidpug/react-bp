import { getProfile, linkAuth, redirectedAuthSuccess, } from 'Store/user/actions';

import { isOnline, } from 'Store/ui/actions';

const mapApp = {
  Dispatch: {
    getProfile,
    isOnline,
    linkAuth,
    redirectedAuthSuccess,
  },
};

export default mapApp;
