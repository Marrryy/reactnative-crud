import {
  combineReducers
} from 'redux'
import {
  GET_CONTACT
} from '../enums/mutations'

function data(state = {}, action) {
  const {
    type,
    payload
  } = action
  switch (type) {
    case GET_CONTACT:
      state = { contacts: payload }
      return state;
    default:
      return state
  }
}
const rootReducer = combineReducers({
  data
})
export default rootReducer
