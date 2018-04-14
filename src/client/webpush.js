import axios from 'axios';
/*eslint-disable */
import { pushEndpointRoute } from 'Shared/routes';

const vapidPublicKey = 'BDdRNHkhF-kU77DIoSBFy6zLSekAoTGlA-pZQYlCq78Y-wsWu78gVZRDllsMhBHh5ELC6TsRqwQ_2FnE-vfVzN8';

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) outputArray[i] = rawData.charCodeAt(i);

  return outputArray;
}

const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey);

export const subscribePush = async () => {
  if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
    console.log('passed if');

    try {
      const registration = await navigator.serviceWorker.ready;
      console.log('serviceworker ready');

      const subscription = await registration.pushManager.subscribe({
        applicationServerKey: convertedVapidKey,
        userVisibleOnly: true,
      });

      console.log('got subscription', subscription);

      const token = localStorage.getItem('JWT') || sessionStorage.getItem('JWT');

      console.log('got token', token);

      axios
        .post(pushEndpointRoute('register'), {
          subscription,
          token,
        })
        .then(res => console.log('result', res))
        .catch(e => console.log('error', e));
    } catch (e) {
      return null;
    }
  } else return null;
};

export const unsubscribePush = async () => {
  if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
    const registration = await navigator.serviceWorker.ready;
    const subscription = registration.pushManager;

    if (!subscription) return null;
    const token = localStorage.getItem('JWT') || sessionStorage.getItem('JWT');

    await subscription.unsubscribe();

    axios.post(pushEndpointRoute('unregister'), { token });
  } else return null;
};
