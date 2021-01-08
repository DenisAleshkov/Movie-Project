import {
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
} from "./../constants";

const initialState = {
  isAuth: false,
  userId: null,
  firstName: "",
  lastName: "",
  email: "",
  error: null,
};

const LoadingReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS: {
      console.log("LOGIN_SUCCESS");
      console.log('action', action.payload)
      return {
        ...state,
        isAuth: action.payload.isAuth,
        userId: action.payload.userId,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        email: action.payload.email,
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
      };
    }
    case REGISTER_ERROR: {
      console.log("REGISTER_ERROR");
      console.log(action.payload);
      return {
        ...state,
        error: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default LoadingReducer;
