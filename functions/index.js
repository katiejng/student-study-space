const _ = require("lodash");
const functions = require('firebase-functions');
const admin = require("firebase-admin");
const mockData = require('./mockData');
const https = require("https");
const moment = require('moment');
const axios = require('axios');
const cors = require('cors')({
  origin: true,
});

admin.initializeApp();

exports.resetDevDatabase = functions.https.onRequest((request, response) => {
  admin.database().ref("/").set(mockData).then(() => {
    response.send("Successfully reset the database");
  }).catch(() => {
    response.send("ERROR: please try again");
  });
});

exports.beginQuiz = functions.https.onRequest((request, response) => {
  return cors(request, response, () => {
    const { unitId, quizId, chatRoomId, timeToBegin } = request.query;
    setTimeout(() => {
      const chatRoomRef = admin.database().ref(`/spaces/${unitId}/chat/${chatRoomId}/messages`);
      const quizQuestionsRef = admin.database().ref(`/spaces/${unitId}/quizzes/${quizId}`);

      quizQuestionsRef.child("name").once("value").then(snapshot => {
        const quizName = snapshot.val();

        chatRoomRef.push({
          userId: -1,
          userName: "Quiz Bot",
          text: `Get ready! ${quizName} is about to begin`,
          timeStamp: moment().format()
        });

        quizQuestionsRef.child("question").once("value").then(snapshot2 => {
          const questionObject = snapshot2.val();

          let remainingQuestions = JSON.stringify(Object.keys(questionObject).map(key => questionObject[key]));

          axios.get(`https://us-central1-student-study-space.cloudfunctions.net/askQuestion?unitId=${unitId}&chatRoomId=${chatRoomId}&remainingQuestions=${remainingQuestions}`);

          response.send("Quiz Success");
        });
      });
    }, timeToBegin);
  });
});

exports.askQuestion = functions.https.onRequest((request, response) => {
  return cors(request, response, () => {
    const { unitId, chatRoomId } = request.query;

    let remainingQuestions = request.query.remainingQuestions;
    if (typeof remainingQuestions != "object") {
      remainingQuestions = JSON.parse(remainingQuestions);
    }

    const chatRoomRef = admin.database().ref(`/spaces/${unitId}/chat/${chatRoomId}/messages`);

    const currentQuestion = _.first(remainingQuestions);

    const newRemainingQuestions = _.drop(remainingQuestions);

    chatRoomRef.push({
      userId: -1,
      userName: "Quiz Bot",
      text: `QUESTION: ${currentQuestion.question}!${currentQuestion.options.map((option, index) => `<NEWLINE>${String.fromCharCode(97 + index)}: ${option.text}`)}`,
      timeStamp: moment().format()
    });

    let correctAnswer;

    for (let i = 0; i < currentQuestion.options.length; i++) {
      const { isCorrect } = currentQuestion.options[i];
      if (typeof isCorrect == "boolean") {
        if (currentQuestion.options[i].isCorrect == true) {
          correctAnswer = String.fromCharCode(97 + i);
          break;
        }
      } else if (typeof isCorrect == "string") {
        if (currentQuestion.options[i].isCorrect == "true") {
          correctAnswer = String.fromCharCode(97 + i);
          break;
        }
      }
    }

    const next = () => {
      if (newRemainingQuestions.length > 0) {
        // console.log("REMAINING QUESTIONS:", newRemainingQuestions.length);
        axios.get(`https://us-central1-student-study-space.cloudfunctions.net/askQuestion?unitId=${unitId}&chatRoomId=${chatRoomId}&remainingQuestions=${JSON.stringify(newRemainingQuestions)}`);
      }
    }

    const startKey = chatRoomRef.push().key;

    const newChatMessagesRef = chatRoomRef.orderByKey().startAt(startKey);

    const questionTimer = setTimeout(() => {
      newChatMessagesRef.off();
      chatRoomRef.push({
        userId: -1,
        userName: "Quiz Bot",
        text: `The correct answer was ${correctAnswer}!`,
        timeStamp: moment().format()
      });
      next();
      return response.send("Quiz Success");
    }, 10000);

    newChatMessagesRef.on("child_added", snapshot => {
      const message = snapshot.val();

      if (message.text == correctAnswer) {
        newChatMessagesRef.off();
        clearTimeout(questionTimer);

        chatRoomRef.push({
          userId: -1,
          userName: "Quiz Bot",
          text: `Correct! One point to ${message.userName}`,
          timeStamp: moment().format()
        });
        next();
        return response.send("Quiz Success");
      }
    });
  });
});
