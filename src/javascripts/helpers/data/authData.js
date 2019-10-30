import firebase from 'firebase/app';
import 'firebase/auth';
import $ from 'jquery';

const stockDiv = $('#stock');
const logoutNavBar = $('#navbar-button-logout');
const authDiv = $('#auth');

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // someone is logged in, should not see the auth component
      stockDiv.removeClass('hide');
      logoutNavBar.removeClass('hide');
      authDiv.addClass('hide');
    } else {
      // show logged in SHOW auth component
      stockDiv.addClass('hide');
      logoutNavBar.addClass('hide');
      authDiv.removeClass('hide');
    }
  });
};

export default { checkLoginStatus };
