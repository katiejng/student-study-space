import { FETCH_CHAT } from "../actions";

export default function(state = {}, action) {

  switch (action.type) {
    case FETCH_CHAT:
      if (action.payload){
        return Object.assign({}, state, { messages: Object.values(action.payload) });
      } else {
        return Object.assign({}, state, { messages: [] });
      }
    default:
      return state;
  }
}
