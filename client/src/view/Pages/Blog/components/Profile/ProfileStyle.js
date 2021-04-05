export const ProfileStyle = (theme) => ({
  profile: {
    width: "100%",
    height: "100%",
  },
  content: {
    display: "flex",
    justifyContent: "center",
    padding: 40,
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      height: "100%",
      padding: 0,
      flexDirection: "column",
      alignItems: "center",
    },
  },
  avatar: {
    width: 200,
    height: 200,
    marginTop: -140,
  },
  header: {
    height: "200px",
    backgroundPosition: "center",
  },
  profileInfo: {
    width: "30%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  profileNav: {
    width: "70%",
  },
  totalRatings: {
    display: "flex",
    flexDirection: "column",
  },
  totalTv: {
    display: "flex",
  },
  totalMovie: {
    display: "flex",
  },
  listAvatar: {
    backgroundColor: "#efefef",
  },
  totalRatings: {
    marginTop: 20,
    textAlign: "center"
  }
});
