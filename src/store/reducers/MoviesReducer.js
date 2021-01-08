import {
  SET_MOVIES,
  SET_ERROR,
  SET_TV,
  SET_MOVIE_TO_LIBRARY,
  GET_MOVIE_FROM_LIBRARY,
} from "./../constants";

const initialState = {
  movies: {
    page: null,
    moviesList: [],
  },
  tv: {
    page: null,
    tvList: [],
  },
  library: [],
  allMovies: [],
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
    case SET_MOVIE_TO_LIBRARY: {
      return {
        ...state,
        library: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default MoviesReducer;
