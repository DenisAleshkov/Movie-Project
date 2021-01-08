import { SET_LOADING } from "./../constants";

const initialState = {
  isLoaing: null,
};

const LoadingReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING: {
      return {
        ...state,
        isLoaing: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default LoadingReducer;
