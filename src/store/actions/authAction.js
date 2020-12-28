import firebase from "firebase";
import {
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  SIGNOUT_SUCCESS,
  SIGNOUT_ERROR,
  SET_USER,
  SET_PHOTO,
} from "./../constants";
import { setLoading, setAvatarLoading } from "./loadingAction";
import { getMessages, getTopicInfo } from "./blogAction";

export const registerSuccess = () => ({ type: REGISTER_SUCCESS });
export const registerError = (payload) => ({ type: REGISTER_ERROR, payload });

export const loginSuccess = (payload) => ({ type: LOGIN_SUCCESS, payload });
export const loginError = (payload) => ({ type: LOGIN_ERROR, payload });

export const signOutSucces = () => ({ type: SIGNOUT_SUCCESS });
export const signOutError = (payload) => ({ type: SIGNOUT_ERROR, payload });

export const setUser = (payload) => ({ type: SET_USER, payload });

export const setPhoto = (payload) => ({ type: SET_PHOTO, payload });

export const getUserInfo = async (id) => {
  const userData = await firebase.firestore().collection("users").doc(id).get();
  const user = { ...userData.data(), id: userData.id };
  return user;
};

export const login = (credentials) => (dispatch) => {
  dispatch(setLoading(true));
  firebase
    .auth()
    .signInWithEmailAndPassword(credentials.email, credentials.password)
    .then(async (res) => {
      const user = await getUserInfo(res.user.uid);
      if (credentials.checked) {
        localStorage.setItem("token", res.user.uid);
      }
      dispatch(
        loginSuccess({
          isAuth: true,
          userId: res.user.uid,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          photoUrl: "",
        })
      );
      dispatch(setLoading(false));
    })
    .catch((error) => {
      dispatch(loginError(error.message));
      dispatch(setLoading(false));
    });
};

export const register = (credentials) => (dispatch) => {
  dispatch(setLoading(true));
  const db = firebase.firestore().collection("users");
  firebase
    .auth()
    .createUserWithEmailAndPassword(credentials.email, credentials.password)
    .then((res) => {
      db.doc(res.user.uid).set({
        firstName: credentials.firstName,
        lastName: credentials.lastName,
        email: credentials.email,
        photoUrl: "",
      });
      dispatch(registerSuccess());
      dispatch(setLoading(false));
    })
    .catch((error) => {
      dispatch(registerError(error.message));
      dispatch(setLoading(false));
    });
};

export const signOut = (history) => (dispatch) => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      localStorage.removeItem("token");
      dispatch(signOutSucces());
      history.push("/auth/login");
    })
    .catch((error) => {
      dispatch(signOutError(error.response));
    });
};

export const uploadPhoto = (data) => (dispatch) => {
  dispatch(setAvatarLoading(true));
  const { file, userId } = data;
  const imageStorage = firebase.storage().ref("/images").child(userId);
  const db = firebase.firestore().collection("users").doc(userId);
  imageStorage.put(file).then(() => {
    imageStorage
      .getDownloadURL()
      .then((url) => {
        db.update({ photoUrl: url });
        dispatch(setPhoto(url));
        dispatch(setAvatarLoading(false));
      })
      .catch((error) => {
        console.log("Error", error);
        dispatch(setAvatarLoading(false));
      });
  });
};

export const updatePhoto = (ID, photoUrl) => async (dispatch) => {
  const user = await getUserInfo(ID.userId);
  const topic = firebase.firestore().collection("blog");
  const messages = firebase
    .firestore()
    .collection("blog")
    .doc(ID.topic)
    .collection("messages");
  messages.get().then((res) => {
    res.docs.forEach((item) => {
      if (item.data().userId === user.id) {
        messages.doc(item.id).update({
          photoUrl: user.photoUrl,
        });
      }
    });
    dispatch(getMessages(ID.topic));
  });
  topic.get().then((res) => {
    res.docs.forEach((item) => {
      if (item.data().id === user.id) {
        topic.doc(item.id).update({
          photoUrl: user.photoUrl,
        });
      }
    });
    dispatch(getTopicInfo(ID.topic));
  });
};
