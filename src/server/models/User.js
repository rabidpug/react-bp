import bcrypt from 'bcrypt-nodejs';
import mongoose from 'mongoose';
const UserSchema = mongoose.Schema( { password: { required : true,
                                                  type     : String, },
                                      username: {
    required : true,
    type     : String,
    unique   : true,
  }, } );

function saveUser ( next ) {
  const user = this;

  if ( this.isModified( 'password' ) || this.isNew ) {
    bcrypt.genSalt(
      10, (
        err, salt
      ) => {
        if ( err ) return next( err );

        bcrypt.hash(
          user.password, salt, null, (
            err, hash
          ) => {
            if ( err ) return next( err );

            user.password = hash;

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
    passw, this.password, (
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
