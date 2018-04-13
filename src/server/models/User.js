import { MOD_VERIFY_USERS, } from 'Shared/env';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
const UserSchema = mongoose.Schema( {
  facebook: {
    id: {
      index    : true,
      required : false,
      sparse   : true,
      trim     : true,
      type     : String,
      unique   : true,
    },
  },
  google: {
    id: {
      index    : true,
      required : false,
      sparse   : true,
      trim     : true,
      type     : String,
      unique   : true,
    },
  },
  isVerified: {
    default  : !MOD_VERIFY_USERS,
    index    : true,
    required : true,
    type     : Boolean,
    unique   : false,
  },
  local: {
    password: {
      required : false,
      type     : String,
    },
    username: {
      index    : true,
      required : false,
      sparse   : true,
      trim     : true,
      type     : String,
      unique   : true,
    },
  },
  profile: {
    displayNames: {
      required : false,
      type     : Array,
    },
    emails: {
      required : false,
      type     : Array,
    },
    photos: {
      required : false,
      type     : Array,
    },
    providers: {
      facebook : { type: Boolean, },
      google   : { type: Boolean, },
      local    : { type: Boolean, },
    },
    publicProfile: {
      displayNames: {
        default  : 'Anonymous',
        required : true,
        type     : String,
      },
      emails: {
        default  : 'Anonymous',
        required : true,
        type     : String,
      },
      photos: {
        default  : 'Anonymous',
        required : false,
        type     : String,
      },
      publicId: {
        default  : () => new mongoose.Types.ObjectId(),
        index    : true,
        required : true,
        type     : mongoose.Schema.Types.ObjectId,
        unique   : true,
      },
    },
  },
  refreshToken: {
    index    : true,
    required : false,
    sparse   : true,
    trim     : true,
    type     : String,
    unique   : true,
  },
  roles: {
    index    : true,
    required : false,
    type     : Array,
  },
} );

function saveUser ( next ) {
  const user = this;

  if ( user.local.password && ( this.isModified( 'local.password' ) || this.isNew ) ) {
    bcrypt
      .hash( user.local.password, 10 )
      .then( hash => {
        user.local.password = hash;

        next();
      } )
      .catch( e => next( e ) );
  } else next();
}
function comparePassword ( password ) {
  return bcrypt.compare( password, this.local.password );
}

UserSchema.pre( 'save', saveUser );

UserSchema.methods = { comparePassword, };

const User = mongoose.model( 'User', UserSchema );

export default User;
