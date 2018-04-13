import { getProfile, linkAuth, redirectedAuthSuccess, } from 'Store/user/actions';

import { isOnline, } from 'Store/ui/actions';

const mapApp = {
  Dispatch: {
    isOnline,
    linkAuth,
    redirectedAuthSuccess,
    getProfile,
  },
};

export default mapApp;
