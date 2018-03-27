import { helloEndpointRoute, } from 'Shared/routes';
const helloApi = app => {
  app.get(
    helloEndpointRoute(), (
      req, res
    ) => {
      res.json( { message: `Hello from the server! (received ${req.params.num})`, } );
    }
  );
};

export default helloApi;
