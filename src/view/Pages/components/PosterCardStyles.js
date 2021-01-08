export const PosterCardStyles = (theme) => ({
  root: {
    position: "relative",
    backgroundColor: "#0cde87",
    width: 250,
    height: 300,
    margin: "20px",
    "&:hover $media": {
      opacity: "0.5",
    },
    "&:hover $favoriteWithBorder": {
      opacity: 1,
      transform: "scale(1)",
      transition: "transform .2s ease, opacity 1s ease",
    },
    "&:hover $title": {
      opacity: 1,
      cursor: "pointer",
      transform: "scale(1)",
      transition: "transform .2s ease, opacity 1s ease",
    },
  },
  media: {
    paddingTop: "56.25%",
    transition: "all 0.4s ease",
    height: "100%",
  },
  title: {
    color: "#fff",
    textAlign: "center",
    position: "absolute",
    margin: "auto",
    height: "50px",
    lineHeight: "30px",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    opacity: 0,
    transform: "scale(0)",
    transition: "transform .5s ease, opacity .7s ease",
  },
  favoriteWithBorder: {
    cursor: "pointer",
    position: "absolute",
    top: 15,
    right: 15,
    transform: "scale(0)",
    transition: "transform .5s ease, opacity .7s ease",
    zIndex: "10"
  },
});
