import bcrypt from 'bcrypt-nodejs';
import mongoose from 'mongoose';
const UserSchema = mongoose.Schema( { google: { id: {
  required : false,
  type     : String,
  unique   : true,
}, },
                                      local: { password: { required : false,
                                                           type     : String, },
                                               username: {
      required : false,
      type     : String,
      unique   : true,
    }, }, } );

function saveUser ( next ) {
  const user = this;

  if ( this.isModified( 'local.password' ) || this.isNew ) {
    bcrypt.genSalt(
      10, (
        err, salt
      ) => {
        if ( err ) return next( err );

        bcrypt.hash(
          user.local.password, salt, null, (
            err, hash
          ) => {
            if ( err ) return next( err );

            user.local.password = hash;

            next();
          }
        );
      }
    );
  } else return next();
}
function comparePassword (
  passw, cb
) {
  bcrypt.compare(
    passw, this.local.password, (
      err, isMatch
    ) => {
      if ( err ) return cb( err );

      cb(
        null, isMatch
      );
    }
  );
}

UserSchema.pre(
  'save', saveUser
);

UserSchema.methods.comparePassword = comparePassword;

const User = mongoose.model(
  'User', UserSchema
);

export default User;
