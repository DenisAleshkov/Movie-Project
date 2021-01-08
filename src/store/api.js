import { GLOBALS } from "./constants";

const { BASE_URL, API_KEY, LANG, BY_POPULARITY } = GLOBALS;

export const MOVIE = {
  GET_POPULAT_MOVIES: (page) =>
    `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=${LANG}&page=${page}`,
  GET_POPULAR_TV: (page) =>
    `${BASE_URL}/tv/popular?api_key=${API_KEY}&language=${LANG}&page=${page}`,
  GET_GENRES: (type) =>
    `${BASE_URL}/genre/${type}/list?api_key=${API_KEY}&language=${LANG}`,
  SEARCH_MOVIE: (isAdult, page, vote_average, genres, vote_count, type) =>
    `${BASE_URL}/discover/${type}?api_key=${API_KEY}&language=${LANG}&sort_by=${BY_POPULARITY}&include_adult=${isAdult}&page=${page}&vote_average.gte=${vote_average}&with_genres=${genres}&vote_count.gte=${vote_count}`,
  SEARCH_MOVIE_BY_TITLE: (query, page, adult, type) =>
    `${BASE_URL}/search/${type}?api_key=${API_KEY}&language==${LANG}&query=${query}&page=${page}&include_adult=${adult}`,
};
