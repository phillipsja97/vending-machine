import machineData from './machineData';
import positionData from './positionData';
import snackPositionData from './snackPosition';
import snacksData from './snackData';

// 1. getMachines - returns first machine (hard coding) - DONE
// 2. use MachineId to get all positions for that machine - DONE
// 3. use MachineId to get all snack positions - DONE
// 4. use uId of snackPositions/positions to get snack for that machine - DONE
// 5. smash them - return an array of positions (in order a1, a2, ....) so positions should
// have position and snack if a snack exists at that position.

const getCompleteMachine = () => new Promise((resolve, reject) => {
  machineData.getMachine()
    .then((singleMachine) => positionData.getAllPositionsByMachineId(singleMachine.id))
    .then((positions) => {
      snackPositionData.getAllSnackPositionsByMachineId(positions[0].machineId)
        .then((snackPositions) => {
          snacksData.getSnacksByUid(positions[0].uId).then((snacks) => {
            console.log('snackPositions', snackPositions);
            resolve(snacks);
          });
        });
    })
    .catch((error) => reject(error));
});

export default { getCompleteMachine };
