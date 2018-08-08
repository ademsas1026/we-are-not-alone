import axios from 'axios';

/*--- Initial State ---*/
const initialState = {
  error: false,
  sighting: {}
}
/*--- Action Types ---*/
const GET_SIGHTING = 'GET_SIGHTING';
const GOT_ERROR = 'GOT_ERROR'

/* ---- Action Creators --- */

const gotError = () => ({
  type: GOT_ERROR
})

/* ---- Thunks --- */
export const addNewSighting = (sighting) => async dispatch => {
  try {
    await axios.post(`/api/sightings`, sighting)
  } catch (err) {
    dispatch(gotError())
    console.error(err)
  }

}

/* ---- Reducer--- */
export default function (state = initialState, action){
  switch (action.type){
    case GET_SIGHTING:
      return {...state, sighting: action.sighting }
    case GOT_ERROR:
      return {...state, error: true}
    default:
      return state;
  }
}
