import { GOOGLE_CLIENT_ID, VAPID_KEY_PRIVATE, VAPID_KEY_PUBLIC, } from 'Shared/env';

import webpush from 'web-push';

webpush.setGCMAPIKey( GOOGLE_CLIENT_ID );

webpush.setVapidDetails( 'mailto:m@jcuneo.com', VAPID_KEY_PUBLIC, VAPID_KEY_PRIVATE );

export default webpush;
