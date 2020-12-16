export const DetailsStyle = (theme) => ({
  root: {
    height: "100%",
  },
  body: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    minHeight: 400,
    backgroundImage:
      "linear-gradient(to right, rgba(3.92%, 4.31%, 6.27%, 1.00) 250px, rgba(3.92%, 4.31%, 6.27%, 0.74) 100%)",
  },
  header: {
    display: "flex",
  },

  headerWrapper: {
    width: "100%",
    borderBottom: "1px solid #000000",
    backgroundPosition: "right -200px top",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    display: "flex",
    position: "relative",
  },
  headerTitle: {
    display: "flex",
    alignItems: "center",
    maxWidth: "30em"
  },
  headerNumber: {
    display: "flex",
    color: "#999",
  },
  titleCount: {
    marginLeft: 10,
  },
  bodyContent: {
    padding: "30px",
    color: "#fff",
    maxWidth: "40%",
  },
  titleText: {
    display: "flex",
    alignItems: "center",
    margin: 0,
  },
  year: {
    fontSize: "33px",
    fontWeight: 400,
    opacity: 0.8,
    marginLeft: "15px",
  },
  boxOverview: {
    color: "#fff",
    display: "flex",
    alignItems: "flex-start",
    backgroundImage:
    "linear-gradient(to right, rgba(3.92%, 4.31%, 6.27%, 1.00) 250px, rgba(3.92%, 4.31%, 6.27%, 0.74) 100%)",
  
  },
  overview: {
    display: "flex",
    flexDirection: "column",
    padding: 20
  },
  overviewContent: {
    display: "flex",
    flexWrap: "wrap",
  },
  overviewText:{
    margin: "25px 0",
  },
  genres: {
    display: "flex",
    width: "50%",
    flexWrap: "wrap"
  },
  overviewItem: {
    width: "50%"
  },
  production: {
    display: "flex",
    alignItems: "baseline",
    flexWrap: "wrap",
    width: "50%"
  },
  similarText: {
    color: "#fff",
    margin: 0,
    padding: "10px 0",
    backgroundImage:
    "linear-gradient(to right, rgba(3.92%, 4.31%, 6.27%, 1.00) 250px, rgba(3.92%, 4.31%, 6.27%, 0.74) 100%)",
  },
  currentSeason:{
    backgroundImage: "linear-gradient(to right, rgba(3.92%, 4.31%, 6.27%, 1.00) 250px, rgba(3.92%, 4.31%, 6.27%, 0.74) 100%)",
    color: "#fff"
  },
  currentSeasonTitle: {
    display: "flex"
  },
  titleSeason: {
    display: "flex",
    flexDirection: "column",
    padding: "30px",
  }
});
