import firebase from 'firebase';
import apiKeys from './helpers/apikeys.json';
import auth from './components/Auth/auth';
import authData from './helpers/data/authData';
import nav from './components/myNavBar/myNavBar';
import machine from './components/machine/machine';
import 'bootstrap';
import '../styles/main.scss';

const init = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  auth.logInButton();
  authData.checkLoginStatus();
  nav.logoutEvent();
  machine.buildTheMachine();
};

init();
