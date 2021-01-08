import axios from "axios";
import {
  SET_TV,
  SET_MOVIES,
  SET_ERROR,
  SET_MOVIE_TO_LIBRARY,
  GET_MOVIE_FROM_LIBRARY,
} from "./../constants";
import { MOVIE } from "./../api";
import { setLoading } from "./loadingAction";

export const setMovies = (payload) => ({ type: SET_MOVIES, payload });
export const setTV = (payload) => ({ type: SET_TV, payload });
export const setError = (payload) => ({ type: SET_ERROR, payload });
export const setMovieToLibraryAction = (payload) => ({
  type: SET_MOVIE_TO_LIBRARY,
  payload,
});

export const getMovies = (page) => (dispatch) => {
  setLoading(true);
  axios
    .get(MOVIE.GET_POPULAT_MOVIES(page))
    .then((result) => {
      dispatch(setMovies(result.data));
      dispatch(setLoading(false));
    })
    .catch((error) => {
      dispatch(setError(error.response.data.errors[0]));
      dispatch(setLoading(false));
    });
};
export const getTV = (page) => (dispatch) => {
  setLoading(true);
  axios
    .get(MOVIE.GET_POPULAR_TV(page))
    .then((result) => {
      dispatch(setTV(result.data));
      dispatch(setLoading(false));
    })
    .catch((error) => {
      dispatch(setError(error.response.data.errors[0]));
      dispatch(setLoading(false));
    });
};

export const setMovieToLibrary = (id, title, poster) => (dispatch) => {
  if (!!id) {
    if (localStorage.getItem("library") === null) {
      const setlibrary = [];
      setlibrary.push({ id, title, poster });
      localStorage.setItem("library", JSON.stringify(setlibrary));
      dispatch(setMovieToLibraryAction(setlibrary));
    } else {
      const libraryLS = JSON.parse(localStorage.getItem("library"));
      const library = libraryLS.filter((element) => {
        return +element.id !== +id;
      });
      library.push({ id, title: title, poster });
      localStorage.setItem("library", JSON.stringify(library));
      dispatch(setMovieToLibraryAction(library));
    }
  }
};

export const getLibraryList = () => (dispatch) => {
  if (localStorage.getItem("library") !== null) {
    const library = JSON.parse(localStorage.getItem("library"));
    dispatch(setMovieToLibraryAction(library));
  }
};

export const removeItemFromLibrary = (id) => (dispatch) => {
  if (!!id) {
    const library = JSON.parse(localStorage.getItem("library"));
    const items = library.filter((item) => +item.id !== +id);
    localStorage.setItem("library", JSON.stringify(items));
    dispatch(setMovieToLibraryAction(items));
  }
};
