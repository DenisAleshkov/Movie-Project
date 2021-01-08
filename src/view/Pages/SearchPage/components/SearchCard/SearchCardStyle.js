export const SearchCardStyle = (theme) => ({
  root: {
    position: "relative",
    width: 350,
    height: 620,
    margin: 20,
    backgroundColor: '#57527b',
    color: "#fff",
    "& .MuiCardHeader-action": {
        marginTop: 0,
        flex: "0 0 auto",
        alignSelf: "auto",
        marginRight: 0,
    }
  },
  media: {
    height: "82%",
  },
  header:{
      alignItems: "center",
      padding: "10px",
  },
  avatar: {
    backgroundColor: "#f50057",
  },
  actionChip: {
    margin: "10px"
  },
  cardAction:{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 7 
  },
});
