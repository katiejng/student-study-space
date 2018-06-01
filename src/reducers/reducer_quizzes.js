import { FETCH_QUIZZES } from "../actions";

export default function (state = {}, action) {
  switch (action.type) {
    case FETCH_QUIZZES:
      if (action.payload){
        return Object.assign({}, state, { quizzes: Object.values(action.payload) });
      } else {
        return Object.assign({}, state, { quizzes: [] });
      }
    default:
      return state;
  }
}
