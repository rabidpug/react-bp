import push from './push';
import { pushEndpointRoute, } from 'Shared/routes';
const pushApi = app => {
  app.use( pushEndpointRoute(), push );
};

export default pushApi;
