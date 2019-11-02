import axios from 'axios';
import apikeys from '../apikeys.json';

const baseUrl = apikeys.firebaseKeys.databaseURL;

const getMachine = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/machines.json`)
    .then((response) => {
      const demMachines = response.data;
      const machines = [];
      Object.keys(demMachines).forEach((fbId) => {
        demMachines[fbId].id = fbId;
        machines.push(demMachines[fbId]);
      });
      resolve(machines[0]); // [0] = hard code to only return first machine that comes back
    })
    .catch((error) => reject(error));
});

export default { getMachine };
