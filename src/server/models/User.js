import bcrypt from 'bcrypt-nodejs';
import mongoose from 'mongoose';
const UserSchema = mongoose.Schema( {
  firstName: { required : false,
               type     : String, },
  google: { id: { required : false,
                  type     : String, }, },
  lastName: { required : false,
              type     : String, },
  local: { password: { required : false,
                       type     : String, },
           username: { required : false,
                       type     : String, }, },
  photos: { required : false,
            type     : Array, },
} );

function saveUser ( next ) {
  const user = this;

  if ( this.isModified( 'local.password' ) || this.isNew ) {
    if ( user.local.password ) {
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
    } else next();
  } else return next();
}
function comparePassword (
  password, cb
) {
  bcrypt.compare(
    password, this.local.password, (
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

UserSchema.methods = { comparePassword, };

const User = mongoose.model(
  'User', UserSchema
);

export default User;
