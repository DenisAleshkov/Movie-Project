import { GLOBALS, API_ROOT } from "./constants";

const { BASE_URL, API_KEY, LANG, BY_POPULARITY, SESSION_ID } = GLOBALS;

export const USER = {
  LOGIN: () => `${API_ROOT}api/user/login`,
  REGISTER: () => `${API_ROOT}api/user/registration`,
  AUTH: () => `${API_ROOT}api/user/auth`,
};

export const EVENT = {
  GET_CITY: () => `${API_ROOT}api/city`,
  GET_LOCATION: () => `${API_ROOT}api/location`,
  GET_EVENTS: () => `${API_ROOT}api/event`,
  SEARCH_BY_CITY: (cityId) => `${API_ROOT}api/event?cityId=${cityId}`,
  GET_TYPES: () => `${API_ROOT}api/type`,
  GET_EVENT_BY_TYPE: () => `${API_ROOT}api/type/getEvent`,
  GET_LOCATION_BY_CITY: () => `${API_ROOT}api/location/getLocationInCity`,
  GET_EVENT_BY_LOCATION: () => `${API_ROOT}api/event/getEventByLocation`,
  CREATE_EVENT: () => `${API_ROOT}api/event/`,
};

export const MOVIE = {
  GET_POPULAR_MOVIES: (page) =>
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
    `${BASE_URL}/movie/${id}/rating?api_key=${API_KEY}&session_id=${SESSION_ID}`,
  SET_RATING_TV: (id) =>
    `${BASE_URL}/tv/${id}/rating?api_key=${API_KEY}&session_id=${SESSION_ID}`,
  GET_RATED_MOVIES: (page) =>
    `${BASE_URL}/account/${API_KEY}/rated/movies?api_key=${API_KEY}&language=${LANG}&session_id=${SESSION_ID}&sort_by=created_at.asc&page=${page}`,
  GET_RATED_TV: (page) =>
    `${BASE_URL}/account/${API_KEY}/rated/tv?api_key=${API_KEY}&language=${LANG}&session_id=${SESSION_ID}&sort_by=created_at.asc&page=${page}`,
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
