import {
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  SIGNOUT_SUCCESS,
  SIGNOUT_ERROR,
  SET_USER,
  SET_PHOTO,
  SET_REGISTER_NOTIF,
} from "./../constants";

const initialState = {
  profileInfo: null,
  isAuth: false,
  userId: null,
  firstName: "",
  lastName: "",
  email: "",
  error: null,
  photoUrl: null,
  notification: null,
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS: {
      console.log("LOGIN_SUCCESS");
      console.log("action", action.payload);
      return {
        ...state,
        isAuth: action.payload.isAuth,
        userId: action.payload.userId,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        email: action.payload.email,
        photoUrl: action.payload.photoUrl,
      };
    }
    case LOGIN_ERROR: {
      console.log("LOGIN_ERROR");
      console.log(action.payload);
      return {
        ...state,
        error: action.payload,
      };
    }
    case REGISTER_SUCCESS: {
      console.log("REGISTER_SUCCESS");
      return {
        ...state,
        error: null,
        notification: action.payload.message,
      };
    }
    case REGISTER_ERROR: {
      console.log("REGISTER_ERROR");
      console.log(action.payload);
      return {
        ...state,
        error: action.payload,
        notification: action.payload,
      };
    }
    case SIGNOUT_SUCCESS: {
      console.log("SIGNOUT_SUCCESS");
      return {
        ...state,
        isAuth: false,
        userId: null,
        firstName: "",
        lastName: "",
        email: "",
        error: null,
      };
    }
    case SIGNOUT_ERROR: {
      console.log("SIGNOUT_ERROR");
      console.log(action.payload);
      return {
        ...state,
        error: action.payload,
      };
    }
    case SET_USER: {
      return {
        ...state,
        isAuth: true,
        userId: action.payload.id,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        email: action.payload.email,
        photoUrl: action.payload.photoUrl,
      };
    }
    case SET_PHOTO: {
      return {
        ...state,
        photoUrl: action.payload,
      };
    }
    case SET_REGISTER_NOTIF: {
      return {
        ...state,
        notification: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default AuthReducer;
