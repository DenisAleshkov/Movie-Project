import { GLOBALS } from "./constants";

const { BASE_URL, API_KEY, LANG } = GLOBALS;

export const MOVIE = {
  GET_POPULAT_MOVIES: (page) =>
    `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=${LANG}&page=${page}`,
  GET_POPULAR_TV: (page) =>
    `${BASE_URL}/tv/popular?api_key=${API_KEY}&language=${LANG}&page=${page}`,
};
