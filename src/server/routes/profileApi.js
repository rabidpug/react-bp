import profile from './profile';
import { profileEndpointRoute, } from 'Shared/routes';
const profileApi = app => {
  app.use( profileEndpointRoute(), profile );
};

export default profileApi;
