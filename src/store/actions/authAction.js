import firebase from "firebase";
import {
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  SIGNOUT_SUCCESS,
  SIGNOUT_ERROR,
  SET_USER
} from "./../constants";

export const registerSuccess = () => ({ type: REGISTER_SUCCESS });
export const registerError = (payload) => ({ type: REGISTER_ERROR, payload });

export const loginSuccess = (payload) => ({ type: LOGIN_SUCCESS, payload });
export const loginError = (payload) => ({ type: LOGIN_ERROR, payload });

export const signOutSucces = () => ({ type: SIGNOUT_SUCCESS });
export const signOutError = (payload) => ({ type: SIGNOUT_ERROR, payload });

export const setUser = payload => ({type: SET_USER, payload})

const getUserInfo = async (id) => {
  const userData = await firebase.firestore().collection("users").doc(id).get();
  const user = userData.data()
  return user;
};

export const login = (credentials) => (dispatch) => {
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
      db.doc(res.user.uid).set({
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
