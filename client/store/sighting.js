import axios from 'axios';

/*--- Action Types ---*/
const GET_SIGHTING = 'GET_SIGHTING';

/* ---- Action Creators --- */
const getSighting = sighting => {
  return {
    type: GET_SIGHTING, 
    sighting
  }
}

/* ---- Thunks --- */
export const addNewSighting = (sighting) => {
  return function thunk(dispatch) {
    return axios.post(`/api/sightings`, sighting)
    .then(res => res.data)
    .catch(console.error);
  }
}

/* ---- Reducer--- */
export default function (state = {}, action){
  switch (action.type){
    case GET_SIGHTING:
      return action.sighting;
    default:
      return state;
  }
}
