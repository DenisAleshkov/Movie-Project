export const SearchCardStyle = (theme) => ({
  root: {
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
    height: "85%",
  },
  header:{
      alignItems: "center",
      padding: "15px",
  },
  avatar: {
    backgroundColor: "#f50057",
  },
  actionChip: {
    margin: "10px"
  }
});
