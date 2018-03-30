import auth from './auth';
import { authEndpointRoute, } from 'Shared/routes';
const authApi = app => {
  app.use(
    authEndpointRoute(), auth
  );
};

export default authApi;
