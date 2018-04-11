import { linkAuth, redirectedAuthSuccess, } from 'Store/user/actions';

import { isOnline, } from 'Store/ui/actions';

const mapApp = {
  Dispatch: {
    isOnline,
    linkAuth,
    redirectedAuthSuccess,
  },
};

export default mapApp;
