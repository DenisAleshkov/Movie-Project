import { SET_DETAILS, SET_SIMILAT_MOVIES } from "./../constants";

const initialState = {
  details: {},
  similarMovies: [],
};

const DetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DETAILS: {
      return {
        ...state,
        details: action.payload,
      };
    }
    case SET_SIMILAT_MOVIES: {
      return {
        ...state,
        similarMovies: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default DetailsReducer;
