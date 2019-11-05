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
            const newPositions = [];
            positions.forEach((position) => {
              const newP = { ...position };
              const getSnackPosition = snackPositions.find((x) => x.positionId === newP.id);
              if (getSnackPosition) {
                const snack = snacks.find((x) => x.id === getSnackPosition.snackId);
                newP.snack = snack;
              } else {
                newP.snack = {};
              }
              newPositions.push(newP);
            });
            resolve(newPositions);
          });
        });
    })
    .catch((error) => reject(error));
});

const getSnacksWithPositions = (uid) => new Promise((resolve, reject) => {
  machineData.getMachine()
    .then((singleMachine) => positionData.getAllPositionsByMachineId(singleMachine.id))
    .then((positions) => {
      snackPositionData.getAllSnackPositionsByMachineId(positions[0].machineId)
        .then((snackPositions) => {
          snacksData.getSnacksByUid(uid).then((snacks) => {
            const newSnacks = [];
            snacks.forEach((snack) => {
              const newSnack = { ...snack };
              const getSnackPosition = snackPositions.find((x) => x.snackId === newSnack.id);
              if (getSnackPosition) {
                const getPosition = positions.find((x) => x.id === getSnackPosition.positionId);
                newSnack.position = getPosition;
                newSnack.snackPositionId = getSnackPosition.id;
              } else {
                newSnack.position = {};
                newSnack.snackPositionId = '';
              }
              newSnacks.push(newSnack);
            });
            resolve(newSnacks);
          });
        });
    })
    .catch((error) => reject(error));
});

const getAvailablePositions = () => new Promise((resolve, reject) => {
  machineData.getMachine().then((machine) => {
    positionData.getAllPositionsByMachineId(machine.id).then((positions) => {
      snackPositionData.getAllSnackPositionsByMachineId(positions[0].machineId).then(
        (snackPositions) => {
          const newPositions = [];
          positions.forEach((position) => {
            const newPosition = { ...position };
            const getSnackPosition = snackPositions.find((x) => x.positionId === newPosition.id);
            if (!getSnackPosition) {
              newPosition.machineId = machine.id;
              newPositions.push(newPosition);
            }
          });
          resolve(newPositions);
        },
      );
    });
  })
    .catch((error) => reject(error));
});

export default { getCompleteMachine, getSnacksWithPositions, getAvailablePositions };
