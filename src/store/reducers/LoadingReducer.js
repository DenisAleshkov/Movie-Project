import { SET_LOADING, SET_NOTIFICATION_LOADING } from "./../constants";

const initialState = {
  isLoading: false,
  isNotificationLoading: false,
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
    default: {
      return state;
    }
  }
};

export default LoadingReducer;
