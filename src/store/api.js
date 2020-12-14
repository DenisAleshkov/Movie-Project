import { GLOBALS } from "./constants";

const { BASE_URL, API_KEY, LANG, BY_POPULARITY, SESSION } = GLOBALS;

export const MOVIE = {
  GET_POPULAT_MOVIES: (page) =>
    `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=${LANG}&page=${page}`,
  GET_POPULAR_TV: (page) =>
    `${BASE_URL}/tv/popular?api_key=${API_KEY}&language=${LANG}&page=${page}`,
  GET_GENRES: (type) =>
    `${BASE_URL}/genre/${type}/list?api_key=${API_KEY}&language=${LANG}`,
  SEARCH_MOVIE: () =>
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=${LANG}&sort_by=${BY_POPULARITY}`,
  SEARCH_MOVIE_BY_TITLE: () =>
    `${BASE_URL}/search/movie?api_key=${API_KEY}&language==${LANG}`,
  SEARCH_TV: () =>
    `${BASE_URL}/discover/tv?api_key=${API_KEY}&language=${LANG}&sort_by=${BY_POPULARITY}`,
  SEARCH_TV_BY_TITLE: () =>
    `${BASE_URL}/search/tv?api_key=${API_KEY}&language==${LANG}`,
  SET_RATING_MOVIE: (id) =>
    `${BASE_URL}/movie/${id}/rating?api_key=${API_KEY}&${SESSION}`,
  SET_RATING_TV: (id) =>
    `${BASE_URL}/tv/${id}/rating?api_key=${API_KEY}&${SESSION}`,
};

export const DETAILS = {
  GET_DETAILS_MOVIE: (id) =>
    `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=${LANG}`,
  GET_SIMILAR_MOVIE: (id, page) =>
    `${BASE_URL}/movie/${id}/similar?api_key=${API_KEY}&language=${LANG}&page=${page}`,
  GET_DETAILS_TV: (id) =>
    `${BASE_URL}/tv/${id}?api_key=${API_KEY}&language=${LANG}`,
  GET_SIMILAR_TV: (id, page) =>
    `${BASE_URL}/tv/${id}/similar?api_key=${API_KEY}&language=${LANG}&page=${page}`,
};
