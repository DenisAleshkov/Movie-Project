export const SimilarMoviesStyle = (theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundImage:
      "linear-gradient(to right, rgba(3.92%, 4.31%, 6.27%, 1.00) 250px, rgba(3.92%, 4.31%, 6.27%, 0.74) 100%)",
  },
  gridList: {
    flexWrap: "nowrap",

    transform: "translateZ(0)",
  },
  title: {
    color: theme.palette.primary.light,
  },
  footerText: {
    color: "#fff",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundImage:
      "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.9) 100%, rgba(0,0,0, 0.0) 0%)",
  },
  poster: {
    height: "98%",
    cursor: "pointer",
    transition: "all .2s ease",
    "&:hover": {
      height: "100%",
    }
  },
});
