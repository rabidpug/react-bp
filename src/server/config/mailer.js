import { GMAIL_PASS, GMAIL_USER, } from 'Shared/env';

import nodemailer from 'nodemailer';
const mailer = nodemailer.createTransport( {
  auth: {
    pass : GMAIL_PASS,
    user : GMAIL_USER,
  },
  service: 'gmail',
} );

export default mailer;
