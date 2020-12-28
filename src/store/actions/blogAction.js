import firebase from "firebase";
import {
  SET_TOPIC,
  SET_ALL_TOPICS,
  SET_TOPIC_INFO,
  SET_MESSAGES,
  UPDATE_MESSAGES,
  SET_LIKES,
  UPDATE_TOPIC_LIKES,
  SET_NOTIFICATION_BLOG,
} from "./../constants";
import { setMessageLoading } from "./../actions/loadingAction";
import { setLoading, setNotificationLoading } from "./loadingAction";
import { getUserInfo } from "./authAction";
import { isLiked, getLikedUser, addLikedUser } from "./../services/blogService";

export const setNotification = (payload) => ({
  type: SET_NOTIFICATION_BLOG,
  payload,
});
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

export const createTopic = (data, credentials) => async (dispatch) => {
  dispatch(setNotificationLoading(true));
  dispatch(setLoading(true));
  const user = await getUserInfo(credentials.userId);
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
      photoUrl: user.photoUrl,
    })
    .then((res) => {
      dispatch(
        setTopic({
          ...data,
          ...credentials,
          lastMessageDate: new Date(),
          MessageFName: credentials.fName,
          MessageLName: credentials.lName,
          photoUrl: user.photoUrl,
          id: res.id,
        })
      );
      dispatch(setNotification({ error: false, message: "Topic is created" }));
      dispatch(setNotificationLoading(false));
    })
    .catch(() => {
      dispatch(setNotification({ error: false, message: "ERROR" }));
      dispatch(setNotificationLoading(false));
    });
};

export const getTopics = () => (dispatch) => {
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

export const getTopicInfo = (id) => async (dispatch) => {
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
    });
};

export const getMessages = (id) => async (dispatch) => {
  dispatch(setMessageLoading(true));
  const messages = [];
  const db = firebase
    .firestore()
    .collection("blog")
    .doc(id)
    .collection("messages");

  db.get().then((result) => {
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

export const sendMessage = (userId, id, data) => async (dispatch) => {
  dispatch(setMessageLoading(true));
  const user = await getUserInfo(userId);
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
    photoUrl: user.photoUrl,
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
          photoUrl: user.photoUrl,
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
  const islike = await isLiked(ID);
  if (islike) {
    const update = addLikedUser(ID, data);
    update
      .then((result) => {
        dispatch(getMessages(ID.topic));
        dispatch(setMessageLoading(false));
      })
      .catch((error) => {
        console.log("ERROR", error);
        dispatch(setMessageLoading(false));
      });
  } else {
    const userData = await getLikedUser(ID);
    if (
      data.changed.changedType === userData.user.type &&
      userData.user.userId === ID.user
    ) {
      dbLikes
        .doc(userData.docID)
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
    dbLikes.doc(userData.docID).update({
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
