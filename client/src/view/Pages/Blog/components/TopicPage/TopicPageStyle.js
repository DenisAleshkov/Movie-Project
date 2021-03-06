export const TopicPageStyle = (theme) => ({
  topicPage: {
    width: "100%",
    height: "100%",
    padding: 16
  },
  root: {
    width: "100%",
    border: "2px solid #57527b",
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: "red",
  },
  headerCard: {
    backgroundColor: "rgba(0,0,0,0.06)"
  },
  footerCard: {
    backgroundColor: "#57527b",
    color: "#fff",
  },
  formSubmit: {
    display: "flex",
    flexDirection: "column",
  },
  messagesBox: {
    marginTop: 30,
  },
  replyBtn: {
    marginTop: 10,
    width: 100,
  },
  stylesBadge: {
    padding: 7,
  },
  footerAction: {
    color: "#fff",
    "&.Mui-disabled": {
      color: "#FFF",
    },
  },
});
