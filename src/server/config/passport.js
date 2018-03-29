import googleStrategy from './googleStrategy';
import localStrategy from './localStrategy';
import passport from 'passport';

passport.use( localStrategy );

googleStrategy && passport.use( googleStrategy );

export default passport;
