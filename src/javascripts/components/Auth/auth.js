import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';
import utilities from '../../helpers/utilties';
import pic from './signin-button.png';

const signMeIn = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider);
};

const logInButton = () => {
  const domString = `<button id="google-auth">
  <img src="${pic}"/>
  </button>`;
  utilities.printToDom('auth', domString);
  $('#google-auth').click(signMeIn);
};

export default { logInButton };
