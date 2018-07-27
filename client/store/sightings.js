import axios from 'axios';

/*--- Action Types ---*/
const GET_SIGHTINGS = 'GET_SIGHTINGS';

/* ---- Action Creators --- */
export const getSightings = sightings => {
  return {
    type: GET_SIGHTINGS,
    sightings
  }
};

/* --- Thunks --- */
export const loadSightings = () => {
  return function thunk (dispatch) {
    return axios.get(`/api/sightings`)
      .then(res => res.data)
      .then(sightings =>  {
        console.log('sightings in thunk: ', sightings); //returns expected data
        return sightings.slice(0, 100);
      })
      .then(sightings => dispatch(getSightings(sightings)))
      .catch(console.error);
  }
}


export const loadSightingsByCluster = (latitude, longitude) => {
  return function thunk(dispatch) {
    return axios.get(`/api/sightings/clusters/${latitude}/${longitude}`)
      .then(res => {
        console.log('sightings back from thunk: ', res.data)
        return res.data
      })
      .then(sightings => dispatch(getSightings(sightings)))
      .catch(console.error)
  }
}



/* --- Reducer --- */
export default function (state = [], action){
  switch (action.type){
    case GET_SIGHTINGS:
      return action.sightings;
    default:
      return state;
  }
}
