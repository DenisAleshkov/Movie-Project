import axios from "axios";
import {
  SET_TV,
  SET_MOVIES,
  SET_ERROR,
  SET_MOVIE_TO_LIBRARY,
  SET_GENRES,
  SET_SEARCH_MOVIES,
  SET_MOVIE_RATE,
  SET_NOTIFICATION,
  SET_RATE_MOVIES,
  SET_RATE_TV,
  SET_CITIES,
  SET_EVENTS,
} from "./../constants";
import { MOVIE, EVENT } from "./../api";
import { setLoading, setNotificationLoading } from "./loadingAction";
import { setInputs } from "./searchAction";

export const setRateMovies = (payload) => ({ type: SET_RATE_MOVIES, payload });
export const setRateTv = (payload) => ({ type: SET_RATE_TV, payload });
export const setMovies = (payload) => ({ type: SET_MOVIES, payload });
export const setRate = (payload) => ({ type: SET_MOVIE_RATE, payload });
export const setNotification = (payload) => ({
  type: SET_NOTIFICATION,
  payload,
});
export const setTV = (payload) => ({ type: SET_TV, payload });
export const setGenres = (payload) => ({ type: SET_GENRES, payload });
export const setError = (payload) => ({ type: SET_ERROR, payload });
export const setSearchMovies = (payload) => ({
  type: SET_SEARCH_MOVIES,
  payload,
});
export const setMovieToLibraryAction = (payload) => ({
  type: SET_MOVIE_TO_LIBRARY,
  payload,
});

export const getMovies = (page) => (dispatch) => {
  axios
    .get(MOVIE.GET_POPULAR_MOVIES(page))
    .then((result) => {
      dispatch(setMovies(result.data));
    })
    .catch((error) => {
      dispatch(setError(error.response.data.errors[0]));
    });
};
export const getTV = (page) => (dispatch) => {
  dispatch(setLoading(true));
  axios
    .get(MOVIE.GET_POPULAR_TV(page))
    .then((result) => {
      dispatch(setTV(result.data));
      dispatch(setLoading(false));
    })
    .catch((error) => {
      dispatch(setError(error.response.data.errors[0]));
    });
};

export const setMovieToLibrary = (id, title, poster) => (dispatch) => {
  if (localStorage.getItem("library") === null) {
    const library = [];
    library.push({ id, title, poster });
    localStorage.setItem("library", JSON.stringify(library));
    dispatch(setMovieToLibraryAction(library));
  } else {
    const library = JSON.parse(localStorage.getItem("library")).filter(
      (element) => {
        return +element.id !== +id;
      }
    );
    library.push({ id, title: title, poster });
    localStorage.setItem("library", JSON.stringify(library));
    dispatch(setMovieToLibraryAction(library));
  }
};

export const getLibraryList = () => (dispatch) => {
  if (localStorage.getItem("library") !== null) {
    const library = JSON.parse(localStorage.getItem("library"));
    dispatch(setMovieToLibraryAction(library));
  }
};

export const removeItemFromLibrary = (id) => (dispatch) => {
  const library = JSON.parse(localStorage.getItem("library")).filter(
    (item) => +item.id !== +id
  );
  localStorage.setItem("library", JSON.stringify(library));
  dispatch(setMovieToLibraryAction(library));
};

export const getGenres = (type) => (dispatch) => {
  dispatch(setLoading(true));
  axios
    .get(MOVIE.GET_GENRES(type))
    .then((result) => {
      dispatch(setGenres(result.data.genres));
      dispatch(setLoading(false));
    })
    .catch((error) => {
      dispatch(setError(error.response.data.errors[0]));
      dispatch(setLoading(false));
    });
};

export const searchMovies = (data, history) => (dispatch) => {
  dispatch(setLoading(true));
  const {
    title,
    average,
    idList,
    adultCheckbox,
    popularity,
    overview,
    searchCheckbox,
  } = data;
  if (searchCheckbox) {
    dispatch(
      setInputs({
        title,
        average,
        idList,
        adultCheckbox,
        popularity,
        overview,
      })
    );
  }
  if (title) {
    axios
      .get(MOVIE.SEARCH_MOVIE_BY_TITLE(), {
        params: { include_adult: adultCheckbox, page: 1, query: title },
      })
      .then((result) => {
        dispatch(setSearchMovies(result.data));
        history.push("search");
        dispatch(setLoading(false));
      })
      .catch((error) => {
        dispatch(setError(error.response));
        dispatch(setLoading(false));
      });
  } else {
    axios
      .get(MOVIE.SEARCH_MOVIE(), {
        params: {
          include_adult: adultCheckbox,
          page: 1,
          ["vote_count.gte"]: popularity,
          ["vote_average.gte"]: average,
          with_genres: Array.from(idList.keys()).join(),
        },
      })
      .then((result) => {
        dispatch(setSearchMovies(result.data));
        history.push("search");
        dispatch(setLoading(false));
      })
      .catch((error) => {
        dispatch(setError(error.response));
        dispatch(setLoading(false));
      });
  }
  dispatch(setLoading(false));
};

export const searchTV = (data, history) => (dispatch) => {
  dispatch(setLoading(true));
  const {
    title,
    average,
    idList,
    adultCheckbox,
    popularity,
    searchCheckbox,
    overview,
  } = data;
  if (searchCheckbox) {
    dispatch(
      setInputs({
        title,
        average,
        idList,
        adultCheckbox,
        popularity,
        overview,
      })
    );
  }
  if (title) {
    axios
      .get(MOVIE.SEARCH_TV_BY_TITLE(), {
        params: { include_adult: adultCheckbox, page: 1, query: title },
      })
      .then((result) => {
        dispatch(setSearchMovies(result.data));
        history.push("search");
        dispatch(setLoading(false));
      })
      .catch((error) => {
        dispatch(setError(error.response));
        dispatch(setLoading(false));
      });
  } else {
    axios
      .get(MOVIE.SEARCH_TV(), {
        params: {
          include_adult: adultCheckbox,
          page: 1,
          ["vote_count.gte"]: popularity,
          ["vote_average.gte"]: average,
          with_genres: Array.from(idList.keys()).join(),
        },
      })
      .then((result) => {
        dispatch(setSearchMovies(result.data));
        history.push("search");
        dispatch(setLoading(false));
      })
      .catch((error) => {
        dispatch(setError(error.response));
        dispatch(setLoading(false));
      });
  }
  dispatch(setLoading(false));
};

export const setMovieRate = (id, value) => (dispatch) => {
  dispatch(setNotificationLoading(true));
  axios
    .post(MOVIE.SET_RATING_MOVIE(id), {
      value: value,
    })
    .then((res) => {
      dispatch(
        setNotification({ error: false, message: res.data.status_message })
      );
      dispatch(setNotificationLoading(false));
    })
    .catch((error) => {
      dispatch(
        setNotification({
          error: true,
          message: error.response.data.status_message,
        })
      );
      dispatch(setNotificationLoading(false));
    });
};

export const setTvRate = (id, value) => (dispatch) => {
  dispatch(setNotificationLoading(true));
  axios
    .post(MOVIE.SET_RATING_TV(id), {
      value: value,
    })
    .then((res) => {
      dispatch(
        setNotification({ error: false, message: res.data.status_message })
      );
      dispatch(setNotificationLoading(false));
    })
    .catch((error) => {
      dispatch(
        setNotification({
          error: true,
          message: error.response.data.status_message,
        })
      );
      dispatch(setNotificationLoading(false));
    });
};

export const getRateMovies = (page) => (dispatch) => {
  dispatch(setLoading(true));
  axios
    .get(MOVIE.GET_RATED_MOVIES(page))
    .then((result) => {
      const average =
        result.data.results.length &&
        result.data.results.reduce((accum, current) => {
          return accum + current.rating;
        }, 0) / result.data.results.length;
      dispatch(
        setRateMovies({ movies: result.data.results, myAverageMovies: average })
      );
      dispatch(setLoading(false));
    })
    .catch((error) => {
      dispatch(setError(error.response.data.status_message));
      dispatch(setLoading(false));
    });
};

export const getRateTv = (page) => (dispatch) => {
  dispatch(setLoading(true));
  axios
    .get(MOVIE.GET_RATED_TV(page))
    .then((result) => {
      const average =
        result.data.results.length &&
        result.data.results.reduce((accum, current) => {
          return accum + current.rating;
        }, 0) / result.data.results.length;
      dispatch(setRateTv({ tv: result.data.results, myAverageTv: average }));
      dispatch(setLoading(false));
    })
    .catch((error) => {
      dispatch(setError(error.response.data.status_message));
      dispatch(setLoading(false));
    });
};

export const setCities = (payload) => ({ type: SET_CITIES, payload });
export const setEvents = (payload) => ({ type: SET_EVENTS, payload });

export const getCities = () => (dispatch) => {
  axios
    .get(EVENT.GET_CITY())
    .then((data) => {
      dispatch(setCities(data.data));
    })
    .catch((error) => {
      console.log("error", error);
    });
};

export const searchEventsByCity = (cityId, history) => (dispatch) => {
  console.log('history', history)
  axios
    .get(EVENT.SEARCH_BY_CITY(cityId))
    .then((data) => {
      dispatch(setEvents(data.data.rows));
      history.push("/home/search")
    })
    .catch((error) => {
      console.log("error", error);
    });
};

export const getEvents = () => dispatch => {
  axios.get(EVENT.GET_EVENTS()).then(data=>{
    dispatch(setEvents(data.data.rows));
  }).catch(error=>{
    console.log('error', error)
  })
}
