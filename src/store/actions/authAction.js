import firebase from "firebase";
import {
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
} from "./../constants";

export const registerSuccess = () => ({ type: REGISTER_SUCCESS });
export const registerError = (payload) => ({ type: REGISTER_ERROR, payload });

export const loginSuccess = (payload) => ({ type: LOGIN_SUCCESS, payload });
export const loginError = (payload) => ({ type: LOGIN_ERROR, payload });

export const login = (credentials) => (dispatch) => {
  const db = firebase.firestore().collection("users");
  firebase
    .auth()
    .signInWithEmailAndPassword(credentials.email, credentials.password)
    .then(async (res) => {
      const userData = await db.get(res.user.uid);
      const user = userData.docs
        .filter((doc) => doc.data().email === credentials.email)
        .map((doc) => doc.data())[0];
      dispatch(
        loginSuccess({
          isAuth: true,
          userId: res.user.uid,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        })
      );
    })
    .catch((error) => {
      dispatch(loginError(error.message));
    });
};

export const register = (credentials) => (dispatch) => {
  const db = firebase.firestore().collection("users");
  firebase
    .auth()
    .createUserWithEmailAndPassword(credentials.email, credentials.password)
    .then((res) => {
      db.doc(res.user.id).set({
        firstName: credentials.firstName,
        lastName: credentials.lastName,
        email: credentials.email,
      });
      dispatch(registerSuccess());
    })
    .catch((error) => {
      dispatch(registerError(error.message));
    });
};
