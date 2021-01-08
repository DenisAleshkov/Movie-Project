import {
  SET_MOVIES,
  SET_MOVIE_RATE,
  SET_ERROR,
  SET_TV,
  SET_MOVIE_TO_LIBRARY,
  SET_GENRES,
  SET_SEARCH_MOVIES,
  SET_NOTIFICATION,
  SET_REMEMBER_INPUTS,
  SET_RATE_MOVIES,
  SET_RATE_TV,
} from "./../constants";

const initialState = {
  movies: [],
  moviesCurrentPage: 0,
  moviesRating: [],
  tv: [],
  tvCurrentPage: 0,
  notification: null,
  genres: [],
  library: [],
  error: null,
  searchMovies: [],
  rememberInput: null,
  rateTv: [],
  myAverageTv: 0,
  rateMovies: [],
  myAverageMovies: 0,
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
    case SET_TV: {
      return {
        ...state,
        tvCurrentPage: state.tvCurrentPage + 1,
        tv: [...state.tv, ...action.payload.results],
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
    case SET_REMEMBER_INPUTS: {
      return {
        ...state,
        rememberInput: action.payload,
      };
    }
    case SET_RATE_MOVIES: {
      return {
        ...state,
        rateMovies: action.payload.movies,
        myAverageMovies: action.payload.myAverageMovies,
      };
    }
    case SET_RATE_TV: {
      return {
        ...state,
        rateTv: action.payload.tv,
        myAverageTv: action.payload.myAverageTv,
      };
    }
    default: {
      return state;
    }
  }
};

export default MoviesReducer;
