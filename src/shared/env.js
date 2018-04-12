import dotenv from 'dotenv';
import path from 'path';

dotenv.config( { path: path.resolve( __dirname, '../.env' ), } );

export const {
  PROJECT_TITLE,
  PORT,
  MONGODB_URI,
  PASSPORT_SECRET,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  FACEBOOK_CLIENT_ID,
  FACEBOOK_CLIENT_SECRET,
  MOD_VERIFY_USERS,
  NODE_ENV,
  NO_REPLY_EMAIL,
  GMAIL_USER,
  GMAIL_PASS,
} = process.env;
