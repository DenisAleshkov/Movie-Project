export const LibraryCardStyles = (theme) => ({
  root: {
    position: "relative",
    backgroundColor: "#545454",
    width: 300,
    height: 450,
    margin: "20px",
    "&:hover $media": {
      opacity: "0.05",
    },
    "&:hover $deleteIcon": {
      opacity: 1,
      cursor: "pointer",
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
  deleteIcon: {
    position: "absolute",
    top: "15px",
    right: "15px",
    color: "#ff0f0f",
    transform: "scale(0)",
    transition: "transform .5s ease, opacity .7s ease",
    zIndex: "10",
  },
});
