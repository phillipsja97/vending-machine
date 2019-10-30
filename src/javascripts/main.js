import firebase from 'firebase';
import apiKeys from './helpers/apikeys.json';
import 'bootstrap';
import '../styles/main.scss';

const init = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  console.error(apiKeys.firebaseKeys);
};

init();
