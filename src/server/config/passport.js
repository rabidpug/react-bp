import facebookStrategy from './facebookStrategy';
import googleStrategy from './googleStrategy';
import localStrategy from './localStrategy';
import passport from 'passport';

passport.use( localStrategy );

googleStrategy && passport.use( googleStrategy );

facebookStrategy && passport.use( facebookStrategy );

export default passport;
