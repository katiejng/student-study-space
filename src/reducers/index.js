import { combineReducers } from 'redux';

import UserReducer from "./reducer_user"
import ChatReducer from "./reducer_chat";
import ReviewReducer from './reducer_reviews';
import HomeReducer from "./reducer_home";
import QuizzesReducer from "./reducer_quizzes";

const rootReducer = combineReducers({
  // state: stateReducer
  userState: UserReducer,
  messages: ChatReducer,
  reviews: ReviewReducer,
  homeState: HomeReducer,
  quizzes: QuizzesReducer
});

export default rootReducer;
