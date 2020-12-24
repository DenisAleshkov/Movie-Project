export const ProfileStyle = (theme) => ({
  profile: {
    width: "100%",
    height: "100%",
  },

 
  content: {
    display: "flex",
    justifyContent: "center",
    padding: 40,
    color: "#fff",
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
    backgroundColor: "#fff"
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
    textAlign: "center",
  },
  uploadAvatarInput: {
    display: "none"
  },
  profilePhoto: {
    height: "100%",
    width: "100%"
  },
  avatarLoading:{
    marginTop: "-140px",
  },
  homePanel: {
    backgroundColor: "#fff"
  }
});
