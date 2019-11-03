import axios from 'axios';
import apikeys from '../apikeys.json';

const baseUrl = apikeys.firebaseKeys.databaseURL;

const getAllPositionsByMachineId = (machineId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/positions.json?orderBy="machineId"&equalTo="${machineId}"`)
    .then((response) => {
      const demPositions = response.data;
      const positions = [];
      Object.keys(demPositions).forEach((fbId) => {
        demPositions[fbId].id = fbId;
        positions.push(demPositions[fbId]);
      });
      // order the positions A1, A2, A3 .....
      const sortedPositions = positions.sort((a, b) => a.position.localeCompare(b.position, 'en', { numeric: true }));
      resolve(sortedPositions); // [0] = hard code to only return first machine that comes back
    })
    .catch((error) => reject(error));
});

export default { getAllPositionsByMachineId };
