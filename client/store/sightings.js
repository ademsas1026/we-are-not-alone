import axios from 'axios'

/*--- Initial State ---*/
const initialState = {
  isLoading: false,
  error: false,
  sightings: []
}
/*--- Action Types ---*/
const GET_SIGHTINGS = 'GET_SIGHTINGS'
const GOT_ERROR = 'GOT_ERROR'
const IS_LOADING = 'IS_LOADING'
const NOT_LOADING = 'NOT_LOADING'

/* ---- Action Creators --- */
export const getSightings = sightings => ({
    type: GET_SIGHTINGS,
    sightings
})

const isLoading = () => ({
  type: IS_LOADING
})

const notLoading = () => ({
  type: NOT_LOADING
})

const gotError = () => ({
  type: GOT_ERROR
})

/* --- Thunks --- */
export const loadSightings = () => async dispatch => {
  try {
    dispatch(isLoading())
    const { data } = await axios.get(`/api/sightings`)
    dispatch(notLoading())
    let sightings = data.slice(0, 100)
    dispatch(getSightings(sightings))

  } catch (err) {
    dispatch(gotError())
    console.error(err)
  }
}



export const loadSightingsByCluster = (latitude, longitude) => async dispatch => {
  try {
    dispatch(isLoading())
    const { data } = await axios.get(`/api/sightings/clusters/${latitude}/${longitude}`)
    dispatch(notLoading())
    dispatch(getSightings(data))
  } catch (err) {
    dispatch(gotError())
    console.error(err)
  }
}



/* --- Reducer --- */
export default function (state = initialState, action){
  switch (action.type){
    case GET_SIGHTINGS:
      return {...state, sightings: action.sightings}
    case IS_LOADING: 
      return {...state, isLoading: true}
    case NOT_LOADING:
      return {...state, isLoading: false}
    case GOT_ERROR:
      return {...state, error: true}
    default:
      return state;
  }
}
