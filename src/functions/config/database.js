import admin from 'firebase-admin';
import serviceAccount from './../service-account.json'; // eslint-disable-line import/no-unresolved

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://lakshmi-backend.firebaseio.com'
});

export default admin.database();
