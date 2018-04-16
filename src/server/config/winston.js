import appRoot from 'app-root-path';
import winstonApp from 'winston';

const options = {
  console: {
    colorize         : true,
    handleExceptions : true,
    json             : false,
    level            : 'debug',
  },
  file: {
    colorize         : false,
    filename         : `${appRoot}/logs/app.log`,
    handleExceptions : true,
    json             : true,
    level            : 'info',
    maxFiles         : 5,
    maxsize          : 5242880,
  },
};

const winston = winstonApp.createLogger( {
  exitOnError : false,
  transports  : [
    new winstonApp.transports.File( options.file ),
    new winstonApp.transports.Console( options.console ),
  ],
} );

winston.stream = {
  write ( message ) {
    winston.info( message );
  },
};

export default winston;
