import { SET_MOVIES, SET_ERROR, SET_TV } from "./../constants";

const initialState = {
  movies: {
    page: null,
    moviesList: [],
  },
  tv: {
    page: null,
    tvList: [],
  },
  error: null,
};

const MoviesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MOVIES: {
      return {
        ...state,
        movies: {
          page: action.payload.page,
          moviesList: action.payload.results,
        },
      };
    }
    case SET_TV: {
      return {
        ...state,
        tv: {
          page: action.payload.page,
          tvList: action.payload.results,
        },
      };
    }
    case SET_ERROR: {
      return {
        ...state,
        movies: null,
        error: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default MoviesReducer;
