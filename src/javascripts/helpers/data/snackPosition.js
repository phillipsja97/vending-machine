import axios from 'axios';
import apikeys from '../apikeys.json';

const baseUrl = apikeys.firebaseKeys.databaseURL;

const getAllSnackPositionsByMachineId = (machineId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/snackPositions.json?orderBy="machineId"&equalTo="${machineId}"`)
    .then((response) => {
      const demSnackPositions = response.data;
      const snackPositions = [];
      Object.keys(demSnackPositions).forEach((fbId) => {
        demSnackPositions[fbId].id = fbId;
        snackPositions.push(demSnackPositions[fbId]);
      });
      resolve(snackPositions); // [0] = hard code to only return first machine that comes back
    })
    .catch((error) => reject(error));
});

const deleteSnackPosition = (snackPositionId) => axios.delete(`${baseUrl}/snackPositions/${snackPositionId}.json`);

const createSnackPosition = (newSnackPosition) => axios.post(`${baseUrl}/snackPositions.json`, newSnackPosition);

export default { getAllSnackPositionsByMachineId, deleteSnackPosition, createSnackPosition };
