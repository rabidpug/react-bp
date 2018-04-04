import appRoot from 'app-root-path';
import winstonApp from 'winston';

const options = { console: {
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
                    maxsize          : 5242880, // 5MB
                  }, };

// instantiate a new winstonApp Logger with the settings defined above
const winston = new winstonApp.Logger( { exitOnError : false, // do not exit on handled exceptions
                                         transports  : [
                                           new winstonApp.transports.File( options.file ),
                                           new winstonApp.transports.Console( options.console ),
                                         ], } );

// create a stream object with a 'write' function that will be used by `morgan`
winston.stream = { write ( message ) {
  // use the 'info' log level so the output will be picked up by both transports (file and console)
  winston.info( message );
}, };

export default winston;
