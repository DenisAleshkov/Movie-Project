import axios from "axios";
import {SET_TV, SET_MOVIES, SET_ERROR } from "./../constants";
import { MOVIE } from "./../api";
import { setLoading } from "./loadingAction";

export const setMovies = (payload) => ({ type: SET_MOVIES, payload });
export const setTV = (payload) => ({ type: SET_TV, payload });
export const setError = (payload) => ({ type: SET_ERROR, payload });
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
