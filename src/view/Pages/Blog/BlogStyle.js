const drawerWidth = 200;
export const BlogStyle = (theme) => ({
  root: {
    display: "flex",
    width: "100%",
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "#57527b",
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
  },
  sideMenuSelected: {
    color: "#fff"
  },
  navIcon:{
    color: "#fff"
  },
  avatarBox: {
    display: "flex",
    padding: 16,
    justifyContent: "center"
  },
  topics: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around"
  },
  avatar: {
    width: "100px",
    height: "100px",
    fontSize: "3.25rem",
  },
  blog:  {
    width: "100%",
    height: "100%",
  },
  loadingBox:{
    position: "fixed",
    top: 0
  },
  loader: {
    position: "fixed",
    top: 0,
    width: "100%",
  },
});
