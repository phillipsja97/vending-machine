import smash from '../../helpers/data/smash';
import './machine.scss';

// 1. getMachines - returns first machine (hard coding)
// 2. use MachineId to get all positions for that machine
// 3. use MachineId to get all snack positions
// 4. use uId of snackPositions/positions to get snack for that machine
// 5. smash them - return an array of positions (in order a1, a2, ....) so positions should
// have position and snack if a snack exists at that position.

const buildTheMachine = () => {
  smash.getCompleteMachine()
    .then((singleMachine) => console.log('1 machine', singleMachine))
    .catch((error) => console.error(error));
};

export default { buildTheMachine };
