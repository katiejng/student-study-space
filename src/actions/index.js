export const FETCH_CHAT = "fetch_chat";
export const FETCH_REVIEW = "FETCH_REVIEW";
export const UPDATE_USER = "UPDATE_USER";
export const LOAD_USER = "LOAD_USER";
export const FETCH_UNIT_SPACE = "FETCH_UNIT_SPACE";
export const FETCH_QUIZZES = "FETCH_QUIZZES";

export const fetchChat = (chatRef, activeChat) => async dispatch => {
  chatRef.child(activeChat).child("messages").on("value", snapshot => {
    dispatch({
      type: FETCH_CHAT,
      payload: snapshot.val()
    });
  });
}

export const fetchReview = (reviewRef) => async dispatch => {
  reviewRef.on("value", snapshot => {
    dispatch({
      type: FETCH_REVIEW,
      payload: snapshot.val()
    });
  });
}

export const sendChat = (chatRef, activeChat, messageDetails) => async dispatch => {
  chatRef.child(activeChat).child("messages").push(messageDetails);
}

export function updateUser(user) {
  return {
    type: UPDATE_USER,
    payload: user
  }
}


export function loadingUser(user) {
  return {
    type: LOAD_USER,
    payload: null
  }
}

export const addUnitSpace = (userRef, spacesDetails) => async dispatch => {
  // console.log("adding unit space");
  userRef.child('spaces').push(spacesDetails);
}

export const removeUnitSpace = (userRef, spacesDetails) => async dispatch => {
  // console.log("removing unit space", spacesDetails.spaceId);
  userRef.child('spaces').orderByChild('spaceId').equalTo(spacesDetails.spaceId).once("value", function(snapshot) {
    // console.log(snapshot.val());
    // snapshot.ref().remove();
    snapshot.forEach(function(childSnapshot) {
      //remove each child
      userRef.child('spaces').child(childSnapshot.key).remove();
    });
  });
}

export const fetchUnitSpaces = (userRef) => async dispatch => {
  // console.log("fetching unit space");
  userRef.child("spaces").on("value", snapshot => {
    dispatch({
      type: FETCH_UNIT_SPACE,
      payload: snapshot.val(),
    });
  });
}

export const fetchQuizzes = (quizzesRef) => async dispatch => {
  // console.log("fetching quizzes");
  quizzesRef.on("value", snapshot => {
    dispatch({
      type: FETCH_QUIZZES,
      payload: snapshot.val(),
    });
  });
};