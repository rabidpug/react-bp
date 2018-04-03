import bcrypt from 'bcrypt-nodejs';
import mongoose from 'mongoose';
const UserSchema = mongoose.Schema( {
  facebook: { id: {
    index    : true,
    required : false,
    sparse   : true,
    trim     : true,
    type     : String,
    unique   : true,
  }, },
  google: { id: {
    index    : true,
    required : false,
    sparse   : true,
    trim     : true,
    type     : String,
    unique   : true,
  }, },
  local: { password: { required : false,
                       type     : String, },
           username: {
             index    : true,
             required : false,
             sparse   : true,
             trim     : true,
             type     : String,
             unique   : true,
           }, },
  profile: {
    displayNames: { required : false,
                    type     : Array, },
    emails: { required : false,
              type     : Array, },
    photos: { required : false,
              type     : Array, },
    providers: {
      facebook : { type: Boolean, },
      google   : { type: Boolean, },
      local    : { type: Boolean, },
    },
    public: {
      displayNames: { required : false,
                      type     : Number, },
      emails: { required : false,
                type     : Number, },
      photos: { required : false,
                type     : Number, },
    },
  },
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
