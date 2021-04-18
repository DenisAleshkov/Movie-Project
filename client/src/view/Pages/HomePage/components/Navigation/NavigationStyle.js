import { fade } from "@material-ui/core/styles";

const drawerWidth = 166;

export const NavigationStyle = (theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    textAlign: "center",
    paddingLeft: "73px",
    backgroundColor: "#292121ed",
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - 93px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    padding: "16px 16px",
    color: "#fff",
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    color: "#fff",
    backgroundColor: "#57527b",
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
    zIndex: 1300,
    backgroundColor: "#57527b",
  },
  content: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 1,
    paddingTop: theme.spacing(10),
    minHeight: "100vh",
    backgroundColor: "#292121ed",
    [theme.breakpoints.down("xs")]: {
      paddingTop: theme.spacing(5),
    },
  },
  items: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    position: "relative"
  },
  navMenu: {
    display: "flex",
    width: "100%",
    justifyContent: "flex-end",
  },
  activeNavLink: {
    backgroundColor: "#565050",
    "&:hover": {
      backgroundColor: "#565050",
    },
  },
  navBar: {
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  navIcon: {
    color: "#fff",
  },
  navIconText: {
    color: "#fff",
  },
  sideBtn: {
    "&:hover": {
      backgroundColor: "red",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  signOutBtn: {
    color: "#fff",
    borderColor: "#fff!important",
  },
  grid: {
    width: "100%",
    height: "100%",
    padding: 0
  },
  scroll: {
    display: "flex",
    justifyContent: "center",
    height: "99%",
    marginTop: "20px",
    padding: 0,
  },
  scrollBtn: {
    height: "100%",
    maxWidth: 20,
    border: "2px solid #1f1c1c",
    borderRadius: "initial",
    backgroundColor: "#292424",
    "&:hover": {
      color: "red",
    },
  },
  scrollClose: {
    display: "none",
  },
  extendedIcon: {
    position: "fixed",
    fontSize: "50px",
    top: "45%",
    color: "#565050",
  },
  extendedIconEnd: {
    transform: " rotate(90deg)",
  },
  extendedIconStart: {
    transform: " rotate(270deg)",
  },
  notifLoader: {
    zIndex: 1000000,
    position: "fixed",
    bottom: "15px",
  },
});
