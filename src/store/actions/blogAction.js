import firebase from "firebase";
import {
  SET_TOPIC,
  SET_ALL_TOPICS,
  SET_TOPIC_INFO,
  SET_MESSAGES,
  UPDATE_MESSAGES,
} from "./../constants";
import { setLoading } from "./loadingAction";

export const setTopic = (payload) => ({ type: SET_TOPIC, payload });
export const setAllTopics = (payload) => ({ type: SET_ALL_TOPICS, payload });
export const setTopicInfo = (payload) => ({ type: SET_TOPIC_INFO, payload });
export const setMessages = (payload) => ({ type: SET_MESSAGES, payload });
export const updateMessages = (payload) => ({ type: UPDATE_MESSAGES, payload });

export const createTopic = (data, credentials) => (dispatch) => {
  dispatch(setLoading(true));
  firebase
    .firestore()
    .collection("blog")
    .add({
      id: credentials.userId,
      lName: credentials.lName,
      fName: credentials.fName,
      title: data.title,
      description: data.description,
      dateTime: firebase.firestore.FieldValue.serverTimestamp(),
    })
    .then((res) => {
      dispatch(setTopic({ ...data, ...credentials }));
      dispatch(setLoading(false));
      console.log("CREATED");
    })
    .catch(() => {
      console.log("ERROR");
      dispatch(setLoading(false));
    });
};

export const getTopics = (id) => (dispatch) => {
  dispatch(setLoading(true));
  const topics = [];
  firebase
    .firestore()
    .collection("blog")
    .get()
    .then((result) => {
      result.docs.forEach((element) => {
        topics.push({
          ...element.data(),
          id: element.id,
          date: element.data().dateTime.toDate(),
        });
      });
      dispatch(setAllTopics(topics));
      dispatch(setLoading(false));
    })
    .catch((error) => {
      console.log("Error", error);
      dispatch(setLoading(false));
    });
};

export const getTopicInfo = (id) => (dispatch) => {
  dispatch(setLoading(true));
  firebase
    .firestore()
    .collection("blog")
    .doc(id)
    .get()
    .then((result) => {
      dispatch(
        setTopicInfo({
          ...result.data(),
        })
      );
      dispatch(setLoading(false));
    });
};

export const getMessages = (id) => (dispatch) => {
  dispatch(setLoading(true));
  const messages = [];
  firebase
    .firestore()
    .collection("blog")
    .doc(id)
    .collection("messages")
    .get()
    .then((result) => {
      result.docs.forEach((item) => {
        messages.push({
          ...item.data(),
          id: item.id,
        });
      });
      dispatch(setMessages(messages));
      dispatch(setLoading(false));
    });
};

export const sendMessage = (id, data) => (dispatch) => {
  dispatch(setLoading(true));
  const db = firebase
    .firestore()
    .collection("blog")
    .doc(id)
    .collection("messages");
  const dbOnUpdate = firebase.firestore().collection("blog").doc(id);
  db.add({
    message: data.message,
    fName: data.fName,
    lName: data.lName,
    likes: 0,
    date: new Date(),
  })
    .then((result) => {
      dbOnUpdate
      .update({
        lastMessage: new Date(),
        MessageFName:data.fName,
        MessageLName:data.lName,
      })
      .then((result) => console.log(result));
      dispatch(updateMessages({ ...data, likes: 0, id: result.id }));
      dispatch(setLoading(false));
    })
    .catch((error) => {
      console.log("error");
      dispatch(setLoading(false));
    });

};
