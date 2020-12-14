import axios from "axios";
import { SET_DETAILS, SET_SIMILAT_MOVIES } from "./../constants";
import { DETAILS } from "./../api";
import { setError } from "./movieAction";

export const setDetails = (payload) => ({ type: SET_DETAILS, payload });
export const setSimilarMovies = (payload) => ({
  type: SET_SIMILAT_MOVIES,
  payload,
});

export const getDetailsMovie = (id) => (dispatch) => {
  axios
    .get(DETAILS.GET_DETAILS_MOVIE(id))
    .then((result) => dispatch(setDetails(result.data)))
    .catch((error) => dispatch(setError(error.response.data.status_message)));
};

export const getSimilarMovies = (id, page) => (dispatch) => {
  axios
    .get(DETAILS.GET_SIMILAR_MOVIE(id, page))
    .then((result) =>{
        dispatch(setSimilarMovies(result.data.results))
    })
    .catch((error) => dispatch(setError(error.response.data.status_message)));
};

export const getDetailsTv = (id) => (dispatch) => {
  axios
    .get(DETAILS.GET_DETAILS_MOVIE(id))
    .then((result) => dispatch(setDetails(result.data)))
    .catch((error) => dispatch(setError(error.response.data.status_message)));
};

export const getSimilarTv = (id, page) => (dispatch) => {
  axios
    .get(DETAILS.GET_SIMILAR_TV(id, page))
    .then((result) => dispatch(setSimilarMovies(result.data)))
    .catch((error) => dispatch(setError(error.response.data.status_message)));
};
