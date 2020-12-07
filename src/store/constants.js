import Slideshow from "@material-ui/icons/Slideshow";
import Tv from "@material-ui/icons/Tv";
import Book from "@material-ui/icons/BookmarkBorder";

export const GLOBALS = {
  API_KEY: "720082cb7997030cf3bdec52b8169388",
  BASE_URL: "https://api.themoviedb.org/3",
  LANG: "en-US",
};

export const NAV_ICONS = (cssClass = "") => {
  return [
    {
      component: <Slideshow className={cssClass} />,
      url: "/home/movies",
    },
    {
      component: <Tv className={cssClass} />,
      url: "/home/tv",
    },
    {
      component: <Book className={cssClass} />,
      url: "/home/library",
    },
  ];
};

export const FIREBASE_CONFIG = {
  apiKey: "AIzaSyAtadE3LWhSA3YpGcKSoVJfUjqF5hQ1JeY",
  authDomain: "movie-project-e25db.firebaseapp.com",
  projectId: "movie-project-e25db",
  storageBucket: "movie-project-e25db.appspot.com",
  messagingSenderId: "896885905753",
  appId: "1:896885905753:web:9678d9d814ae0fad2f5448",
};

export const SET_MOVIES = "SET_MOVIES";
export const SET_TV = "SET_TV";
export const SET_GENRES = "SET_GENRES";
export const SET_MOVIE_TO_LIBRARY = "SET_MOVIE_TO_LIBRARY";
export const GET_MOVIE_FROM_LIBRARY = "GET_MOVIE_FROM_LIBRARY";

export const SET_LOADING = "SET_LOADING";

export const SET_ERROR = "SET_ERROR";

export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_ERROR = "REGISTER_ERROR";

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_ERROR = "LOGIN_ERROR";

export const SIGNOUT_SUCCESS = "SIGNOUT_SUCCESS";
export const SIGNOUT_ERROR = "SIGNOUT_ERROR";
