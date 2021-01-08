import {
  SET_LOADING,
  SET_NOTIFICATION_LOADING,
  SET_MESSAGE_LOADING,
  SET_AVATAR_LOADING
} from "./../constants";

const initialState = {
  isLoading: false,
  isNotificationLoading: false,
  isMessageLoading: false,
  isAvatarLoading: false,
};

const LoadingReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING: {
      return {
        ...state,
        isLoading: action.payload,
      };
    }
    case SET_NOTIFICATION_LOADING: {
      return {
        ...state,
        isNotificationLoading: action.payload,
      };
    }
    case SET_MESSAGE_LOADING: {
      return {
        ...state,
        isMessageLoading: action.payload,
      };
    }
    case SET_AVATAR_LOADING: {
      return {
        ...state,
        isAvatarLoading: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default LoadingReducer;
