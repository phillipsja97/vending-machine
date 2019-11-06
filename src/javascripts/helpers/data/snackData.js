import axios from 'axios';
import apikeys from '../apikeys.json';

const baseUrl = apikeys.firebaseKeys.databaseURL;

const getSnacksByUid = (uid) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/snacks.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      const demSnacks = response.data;
      const snacks = [];
      Object.keys(demSnacks).forEach((fbId) => {
        demSnacks[fbId].id = fbId;
        snacks.push(demSnacks[fbId]);
      });
      resolve(snacks); // [0] = hard code to only return first machine that comes back
    })
    .catch((error) => reject(error));
});

const addNewSnack = (newSnack) => axios.post(`${baseUrl}/snacks.json`, newSnack);

export default { getSnacksByUid, addNewSnack };
