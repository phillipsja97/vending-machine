import smash from '../../helpers/data/smash';
import utilities from '../../helpers/utilties';
import stockCard from '../stockCard/stockCard';
import './stocker.scss';

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
    })
    .catch((error) => console.error(error));
};

export default { buildTheStocker };
