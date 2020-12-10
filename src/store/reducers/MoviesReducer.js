import {
  SET_MOVIES,
  SET_ERROR,
  SET_TV,
  SET_MOVIE_TO_LIBRARY,
  SET_GENRES,
  SET_SEARCH_MOVIES,
} from "./../constants";

const initialState = {
  movies: [],
  moviePages: [],
  tv: {
    page: null,
    tvList: [],
  },
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
        moviePages: [...state.moviePages, action.payload.page],
        movies: [...state.movies, ...action.payload.results],
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
        movies: null,
        tv: null,
        genres: null,
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
