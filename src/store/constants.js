import Slideshow from "@material-ui/icons/Slideshow";
import Tv from "@material-ui/icons/Tv";

export const GLOBALS = {
  API_KEY: "720082cb7997030cf3bdec52b8169388",
  BASE_URL: "https://api.themoviedb.org/3",
  LANG: "en-US",
};

export const NAV_ICONS = (cssClass = "") => {
  return [
    {
      component: <Slideshow className={cssClass} />,
      url: "/movies",
    },
    {
      component: <Tv className={cssClass} />,
      url: "/tv",
    },
  ];
};

export const SET_MOVIES = "SET_MOVIES";
export const SET_TV = "SET_TV";

export const SET_LOADING = "SET_LOADING";

export const SET_ERROR = "SET_ERROR";
