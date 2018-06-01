import { FETCH_UNIT_SPACE } from "../actions";

export default function(state = {}, action) {

  switch (action.type) {
    case FETCH_UNIT_SPACE:
      if (action.payload){
        return Object.assign({}, state, { spaceId: Object.values(action.payload) });
      } else {
        return Object.assign({}, state, { spaceId: [] });
      }
    default:
      return state;
  }
}
