import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';
import smash from '../../helpers/data/smash';
import utilities from '../../helpers/utilties';
import stockCard from '../stockCard/stockCard';
import snackPositionData from '../../helpers/data/snackPosition';
import machine from '../machine/machine';
import './stocker.scss';

const deleteFromMachine = (e) => {
  e.preventDefault();
  const { uid } = firebase.auth().currentUser;
  snackPositionData.deleteSnackPosition(e.target.id)
    .then(() => {
      // eslint-disable-next-line no-use-before-define
      buildTheStocker(uid);
      machine.buildTheMachine();
    })
    .catch((error) => console.error(error));
};

const buildTheStocker = (uid) => {
  smash.getSnacksWithPositions(uid)
    .then((snacks) => {
      let domString = '<h2>STOCK THE MACHINE</H2>';
      domString += '<div class="d-flex flex-wrap">';
      snacks.forEach((snack) => {
        domString += stockCard.makeASnack(snack);
      });
      domString += '</div>';
      utilities.printToDom('stock', domString);
      $('#stock').on('click', '.delete-snack-position', deleteFromMachine);
    })
    .catch((error) => console.error(error));
};

export default { buildTheStocker };
