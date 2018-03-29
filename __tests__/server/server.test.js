import app from 'Server/server';
import { helloEndpointRoute, } from 'Shared/routes';
import request from 'supertest';

describe(
  'server', () => {
    it(
      'should serve the messages api', done =>
        request( app )
          .get( helloEndpointRoute( 123 ) )
          .then( result => {
            expect( result.body ).toEqual( {} );

            done();
          } )
    );
  }
);
