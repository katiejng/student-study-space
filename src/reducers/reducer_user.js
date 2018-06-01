import {LOAD_USER, UPDATE_USER} from "../actions";

export default function (state = {}, action) {
  if (action.type === UPDATE_USER) {
    // console.log(action.payload)
    return {...state, loadingUser: false, user: action.payload};
  } else if (action.type === LOAD_USER) {
    return {...state, loadingUser: true}
  }
  else {
    return state;
  }


}
