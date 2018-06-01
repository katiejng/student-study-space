import {FETCH_REVIEW} from "../actions";

export default function (state = {subject: [], teachers: []}, action) {

  switch (action.type) {
    case FETCH_REVIEW:
      if (action.payload) {
        return Object.assign({}, state, {...action.payload});
      } else {
        return Object.assign({}, state, {subject: [], teachers: []});
      }
    default:
      return state;
  }
}

