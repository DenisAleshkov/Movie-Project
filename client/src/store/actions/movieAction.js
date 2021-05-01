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
import { getFormValues } from "redux-form";

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

export const searchMovies = (data, history) => (dispatch) => {};

export const searchTV = (data, history) => (dispatch) => {};

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

export const setCity = (payload) => ({ type: "SET_CITY", payload });

export const searchEventsByCity = (cityId, history) => (dispatch) => {
  dispatch(setLoading(true));
  axios
    .get(EVENT.SEARCH_BY_CITY(cityId))
    .then((data) => {
      dispatch(setEvents(data.data.rows));
      dispatch(setCity(cityId));
      dispatch(setLoading(false));
    })
    .catch((error) => {
      console.log("error", error);
      dispatch(setLoading(false));
    });
};

export const getEvents = () => (dispatch) => {
  dispatch(setLoading(true));
  axios
    .get(EVENT.GET_EVENTS())
    .then((data) => {
      dispatch(setEvents(data.data.rows));
      dispatch(setLoading(false));
    })
    .catch((error) => {
      console.log("error", error);
      dispatch(setLoading(false));
    });
};

export const getEventsByLocation = (locationId) => (dispatch) => {
  dispatch(setLoading(true));
  axios
    .post(EVENT.GET_EVENT_BY_LOCATION(), {
      locationId,
    })
    .then((data) => {
      dispatch(setEvents(data.data));
      dispatch(setLoading(false));
    })
    .catch((error) => {
      console.log("error", error);
      dispatch(setLoading(false));
    });
};

export const setTypes = (payload) => ({ type: "SET_TYPES", payload });

export const getTypes = () => (dispatch) => {
  axios
    .get(EVENT.GET_TYPES())
    .then((data) => {
      dispatch(setTypes(data.data));
    })
    .catch((error) => {
      console.log("error", error);
    });
};

export const getEventByType = (typeId) => (dispatch) => {
  dispatch(setLoading(true));
  axios
    .post(EVENT.GET_EVENT_BY_TYPE(), {
      typeId,
    })
    .then((data) => {
      dispatch(setEvents(data.data));
      dispatch(setLoading(false));
    })
    .catch((error) => {
      console.log("error", error.response);
      dispatch(setLoading(false));
    });
};

export const setLocations = (payload) => ({ type: "SET_LOCATIONS", payload });

export const getLocationInCity = (cityId) => (dispatch) => {
  axios
    .post(EVENT.GET_LOCATION_BY_CITY(), {
      cityId,
    })
    .then((data) => {
      dispatch(setLocations(data.data));
    })
    .catch((error) => {
      console.log("error", error);
    });
};

export const createEvent = (values) => (dispatch) => {
  const {
    city,
    description,
    location,
    name,
    price,
    status,
    title,
    type,
    img,
  } = values;
  let formData = new FormData();
  formData.append("name", name);
  formData.append("price", price);
  formData.append("img", img);
  formData.append("status", status);
  formData.append("userId", 1);
  formData.append("locationName", location);
  formData.append("cityId", city.id);
  formData.append("typeId", type.id);
  formData.append(
    "info",
    JSON.stringify({
      title,
      description,
    })
  );
  axios
    .post(EVENT.CREATE_EVENT(), formData)
    .then((data) => {
      console.log("data", data);
    })
    .catch((error) => {
      console.log("error", error.response);
    });
};

export const setDetailsEvent = (payload) => ({ type: "SET_DETAILS", payload });

export const getDetailsEvent = (id) => (dispatch) => {
  console.log("id", id);
  dispatch(setLoading(true));
  axios
    .get(`http://localhost:5000/api/event/${id}`)
    .then((data) => {
      dispatch(setDetailsEvent(data.data));
      dispatch(setLoading(false));
    })
    .catch((error) => {
      console.log("error", error);
      dispatch(setLoading(false));
    });
};

export const setEventRate = (value, eventId, userId) => (dispatch) => {
  dispatch(setNotificationLoading(true));
  axios
    .post("http://localhost:5000/api/event/rateEvent", {
      rating: value,
      eventId,
      userId,
    })
    .then((data) => {
      dispatch(
        setNotification({ error: false, message: "rating was changed" })
      );
      dispatch(setNotificationLoading(false));
    })
    .catch((error) => {
      console.log("error", error);
      dispatch(setNotification({ error: true, message: "some error" }));
      dispatch(setNotificationLoading(false));
      dispatch(setNotificationLoading(false));
    });
};

export const buyTicket = (eventId, userId) => (dispatch) => {
  dispatch(setNotificationLoading(true));
  axios
    .post("http://localhost:5000/api/event/setTicket", {
      eventId,
      userId,
    })
    .then((data) => {
      console.log("data", data);
      dispatch(setNotification({ error: false, message: "ticket was bought" }));
      dispatch(setNotificationLoading(false));
    })
    .catch((error) => {
      dispatch(
        setNotification({
          error: true,
          message: "you have already ticket on the event",
        })
      );
      dispatch(setNotificationLoading(false));
    });
};

// export const setTvEvent = (id, value) => (dispatch) => {
//   dispatch(setNotificationLoading(true));
//   axios
//     .post(MOVIE.SET_RATING_TV(id), {
//       value: value,
//     })
//     .then((res) => {
//       dispatch(
//         setNotification({ error: false, message: res.data.status_message })
//       );
//       dispatch(setNotificationLoading(false));
//     })
//     .catch((error) => {
//       dispatch(
//         setNotification({
//           error: true,
//           message: error.response.data.status_message,
//         })
//       );
//       dispatch(setNotificationLoading(false));
//     });
// };
