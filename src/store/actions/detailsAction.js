import axios from "axios";
import { SET_DETAILS, SET_SIMILAT_MOVIES } from "./../constants";
import { DETAILS } from "./../api";
import { setError } from "./movieAction";
import { setLoading } from "./loadingAction";

export const setDetails = (payload) => ({ type: SET_DETAILS, payload });
export const setSimilarMovies = (payload) => ({
  type: SET_SIMILAT_MOVIES,
  payload,
});

export const getDetailsMovie = (id) => (dispatch) => {
  dispatch(setLoading(true));
  axios
    .get(DETAILS.GET_DETAILS_MOVIE(id))
    .then((result) => {
      dispatch(setDetails(result.data));
      dispatch(setLoading(false));
    })
    .catch((error) => {
      dispatch(setError(error.response.data.status_message));
      dispatch(setLoading(false));
    });
};

export const getSimilarMovies = (id, page) => (dispatch) => {
  dispatch(setLoading(true));
  axios
    .get(DETAILS.GET_SIMILAR_MOVIE(id, page))
    .then((result) => {
      dispatch(setSimilarMovies(result.data.results));
      dispatch(setLoading(false));
    })
    .catch((error) => {
      dispatch(setError(error.response.data.status_message))
      dispatch(setLoading(false));
    });
};

export const getDetailsTv = (id) => (dispatch) => {
  dispatch(setLoading(true));
  axios
    .get(DETAILS.GET_DETAILS_TV(id))
    .then((result) => {
      dispatch(setDetails(result.data));
      dispatch(setLoading(false));
    })
    .catch((error) => {
      dispatch(setError(error.response.data.status_message));
      dispatch(setLoading(false));
    });
};

export const getSimilarTv = (id, page) => (dispatch) => {
  dispatch(setLoading(true));
  axios
    .get(DETAILS.GET_SIMILAR_TV(id, page))
    .then((result) => {
      dispatch(setSimilarMovies(result.data.results));
      dispatch(setLoading(false));
    })
    .catch((error) => {
      dispatch(setError(error.response.data.status_message));
      dispatch(setLoading(false));
    });
};
