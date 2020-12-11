import {
  SET_MOVIES,
  SET_MOVIE_RATE,
  SET_ERROR,
  SET_TV,
  SET_MOVIE_TO_LIBRARY,
  SET_GENRES,
  SET_SEARCH_MOVIES,
  SET_NOTIFICATION,
} from "./../constants";

const initialState = {
  movies: [],
  moviesCurrentPage: 0,
  moviesRating: [],
  tv: {
    page: null,
    tvList: [],
  },
  notification: null,
  genres: [],
  library: [],
  error: null,
  searchMovies: [],
};

const MoviesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MOVIES: {
      return {
        ...state,
        moviesCurrentPage: state.moviesCurrentPage + 1,
        movies: [...state.movies, ...action.payload.results],
      };
    }
    case SET_NOTIFICATION: {
      return {
        ...state,
        notification: action.payload,
      };
    }
    case SET_MOVIE_RATE: {
      return {
        ...state,
        moviesRating: [...state.moviesRating, action.payload],
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
    case SET_GENRES: {
      return {
        ...state,
        genres: action.payload,
      };
    }
    case SET_ERROR: {
      return {
        ...state,
        error: action.payload,
      };
    }
    case SET_MOVIE_TO_LIBRARY: {
      return {
        ...state,
        library: action.payload,
      };
    }
    case SET_SEARCH_MOVIES: {
      return {
        ...state,
        searchMovies: action.payload.results,
      };
    }
    default: {
      return state;
    }
  }
};

export default MoviesReducer;
