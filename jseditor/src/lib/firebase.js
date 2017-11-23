import Rebase from 're-base';
import firebase from 'firebase';

import configParams from '../config/configs.js';

export const init = () => {};
const app = firebase.initializeApp({
  apiKey: configParams.apiKey,
  databaseURL: configParams.firebaseUrl
});
export const base = Rebase.createClass(app.database());
