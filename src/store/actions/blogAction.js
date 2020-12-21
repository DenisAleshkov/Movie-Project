import firebase from "firebase";
import {
  SET_TOPIC,
  SET_ALL_TOPICS,
  SET_TOPIC_INFO,
  SET_MESSAGES,
  UPDATE_MESSAGES,
  SET_LIKES,
  SET_MESSAGES_LIKES,
  UPDATE_TOPIC_LIKES,
} from "./../constants";
import { setMessageLoading } from "./../actions/loadingAction";
import { setLoading } from "./loadingAction";

export const setTopic = (payload) => ({ type: SET_TOPIC, payload });
export const setAllTopics = (payload) => ({ type: SET_ALL_TOPICS, payload });
export const setTopicInfo = (payload) => ({ type: SET_TOPIC_INFO, payload });
export const setMessages = (payload) => ({ type: SET_MESSAGES, payload });
export const setHeaderLikes = (payload) => ({ type: SET_LIKES, payload });
export const setTopicLikes = (payload) => ({
  type: UPDATE_TOPIC_LIKES,
  payload,
});
export const updateMessages = (payload) => ({ type: UPDATE_MESSAGES, payload });

export const createTopic = (data, credentials) => (dispatch) => {
  dispatch(setLoading(true));
  firebase
    .firestore()
    .collection("blog")
    .add({
      lastMessageDate: new Date(),
      MessageFName: credentials.fName,
      MessageLName: credentials.lName,
      lastMessage: data.title,
      id: credentials.userId,
      lName: credentials.lName,
      fName: credentials.fName,
      title: data.title,
      description: data.description,
      likes: 0,
      disLikes: 0,
      dateTime: firebase.firestore.FieldValue.serverTimestamp(),
    })
    .then((res) => {
      dispatch(
        setTopic({
          ...data,
          ...credentials,
          lastMessageDate: new Date(),
          MessageFName: credentials.fName,
          MessageLName: credentials.lName,
          id: res.id,
        })
      );
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
          topicId: result.id,
        })
      );
      dispatch(setLoading(false));
    });
};

export const getMessages = (id) => (dispatch) => {
  dispatch(setMessageLoading(true));
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
      dispatch(setMessageLoading(false));
    });
};

export const sendMessage = (userId, id, data) => (dispatch) => {
  dispatch(setMessageLoading(true));
  const db = firebase
    .firestore()
    .collection("blog")
    .doc(id)
    .collection("messages");
  const dbOnUpdate = firebase.firestore().collection("blog").doc(id);
  db.add({
    id: id,
    userId: userId,
    message: data.message,
    fName: data.fName,
    lName: data.lName,
    likes: 0,
    disLikes: 0,
    date: new Date(),
  })
    .then((result) => {
      dbOnUpdate.update({
        lastMessage: data.message,
        lastMessageDate: new Date(),
        MessageFName: data.fName,
        MessageLName: data.lName,
      });
      dispatch(
        updateMessages({
          ...data,
          likes: 0,
          disLikes: 0,
          id: result.id,
          userId: userId,
          date: firebase.firestore.Timestamp.fromDate(new Date()),
        })
      );
      dispatch(setMessageLoading(false));
    })
    .catch((error) => {
      console.log("Error", error);
      dispatch(setMessageLoading(false));
    });
};

export const updateLikesInHeader = (ID, data) => async (dispatch) => {
  dispatch(setMessageLoading(true));
  const db = firebase.firestore().collection("blog").doc(ID.topic);
  const dbLikes = firebase
    .firestore()
    .collection("blog")
    .doc(ID.topic)
    .collection("isLiked");
  const LikesResponse = await dbLikes.get();
  const isLiked = LikesResponse.docs.filter(
    (item) => item.data().userId === ID.user
  );
  if (!isLiked.length) {
    dbLikes.add({
      userId: ID.user,
      type: data.type,
    });
    db.update({
      likes: data.likes,
      disLikes: data.disLikes,
    })
      .then((result) => {
        dispatch(setTopicLikes({ likes: data.likes, disLikes: data.disLikes }));
        dispatch(setMessageLoading(false));
      })
      .catch((error) => {
        console.log("ERROR", error);
        dispatch(setMessageLoading(false));
      });
  } else {
    const likesUserID = LikesResponse.docs.filter(
      (item) => item.data().userId === ID.user
    )[0];
    const user = likesUserID.data();
    if (data.changed.changedType === user.type && user.userId === ID.user) {
      dbLikes
        .doc(likesUserID.id)
        .delete()
        .then(() => {
          db.update({
            [data.changed.changedType]: data.changed.changedValue - 1,
          })
            .then(() => {
              dispatch(
                setTopicLikes({
                  [data.changed.changedType]: data.changed.changedValue - 1,
                  [data.changed.notChangedType]: data.changed.notChangedValue,
                })
              );
              dispatch(setMessageLoading(false));
            })
            .catch((error) => {
              console.log("ERROR", error);
            });
        })
        .catch((error) => {
          console.log("ERROR", error);
        });
      return false;
    }
    dbLikes.doc(likesUserID.id).update({
      type: data.type,
    });
    db.update({
      [data.changed.changedType]: data.changed.changedValue + 1,
      [data.changed.notChangedType]: data.changed.notChangedValue - 1,
    })
      .then(() => {
        dispatch(
          setTopicLikes({
            [data.changed.changedType]: data.changed.changedValue + 1,
            [data.changed.notChangedType]: data.changed.notChangedValue - 1,
          })
        );
        dispatch(setMessageLoading(false));
      })
      .catch((error) => {
        console.log("ERROR", error);
        dispatch(setMessageLoading(false));
      });
  }
};

export const updateMessagesLikes = (ID, data) => async (dispatch) => {
  dispatch(setMessageLoading(true));
  const db = firebase
    .firestore()
    .collection("blog")
    .doc(ID.topic)
    .collection("messages")
    .doc(ID.message);
  const dbLikes = firebase
    .firestore()
    .collection("blog")
    .doc(ID.topic)
    .collection("messages")
    .doc(ID.message)
    .collection("isLiked");
  const LikesResponse = await dbLikes.get();
  const isLiked = LikesResponse.docs.filter(
    (item) => item.data().userId === ID.user
  );
  if (!isLiked.length) {
    dbLikes.add({
      userId: ID.user,
      type: data.type,
    });
    db.update({
      likes: data.likes,
      disLikes: data.disLikes,
    })
      .then((result) => {
        dispatch(getMessages(ID.topic));
        dispatch(setMessageLoading(false));
      })
      .catch((error) => {
        console.log("ERROR", error);
        dispatch(setMessageLoading(false));
      });
  } else {
    const likesUserID = LikesResponse.docs.filter(
      (item) => item.data().userId === ID.user
    )[0];
    const user = likesUserID.data();
    if (data.changed.changedType === user.type && user.userId === ID.user) {
      dbLikes
        .doc(likesUserID.id)
        .delete()
        .then(() => {
          db.update({
            [data.changed.changedType]: data.changed.changedValue - 1,
          })
            .then(() => {
              dispatch(getMessages(ID.topic));
              dispatch(setMessageLoading(false));
            })
            .catch((error) => {
              console.log("ERROR", error);
            });
        })
        .catch((error) => {
          console.log("ERROR", error);
        });
      return false;
    }
    dbLikes.doc(likesUserID.id).update({
      type: data.type,
    });
    db.update({
      [data.changed.changedType]: data.changed.changedValue + 1,
      [data.changed.notChangedType]: data.changed.notChangedValue - 1,
    })
      .then(() => {
        dispatch(getMessages(ID.topic));
        dispatch(setMessageLoading(false));
      })
      .catch((error) => {
        console.log("ERROR", error);
        dispatch(setMessageLoading(false));
      });
  }
};

export const deleteMessage = (ID) => (dispatch) => {
  dispatch(setMessageLoading(true));
  const db = firebase
    .firestore()
    .collection("blog")
    .doc(ID.topic)
    .collection("messages")
    .doc(ID.message);
  db.delete()
    .then(() => {
      dispatch(getMessages(ID.topic));
      dispatch(setMessageLoading(false));
    })
    .catch((error) => {
      console.log("Error", error);
      dispatch(setMessageLoading(false));
    });
};
