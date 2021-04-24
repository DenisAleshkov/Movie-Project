export const SearchFormStyles = (theme) => ({
  search: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#565050",
    padding: "5px 15px",
    borderRadius: "30px",
    width: "255px",
  },
  searchIcon: {
    cursor: "pointer",
  },
  searchButton: {
    color: "#fff",
  },
  dialogTitle: {
    color: "#565050",
  },
  title: {
    padding: "15px 15px",
  },
  titleText: {
    fontSize: "30px",
    color: "#565050",
    borderBottom: "2px solid #565050",
  },
  dialogText: {
    color: "#565050",
  },
  dialogForm: {
    backgroundColor: "#292121ed",
    border: "2px solid #57527b",
  },
  overviewText: {
    color: "#565050",
  },
  dialogInput: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: "15px",
    border: "4px solid #565050",
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      border: "none",
      display: "none",
    },
    "& .MuiFormLabel-root": {
      display: "none",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    "& .MuiOutlinedInput-input": {
      border: "none",
    },
    "& .MuiInputLabel-outlined": {
      display: "none",
    },
    "& .MuiInputLabel-outlined": {
      border: "none",
    },
  },
  genreslist: {
    display: "flex",
    flexWrap: "wrap",
  },
  genreItem: {
    color: "#565050",
  },
  searchCheckbox: {
    color: "#565050",
    "&.span.MuiIconButton-label": {
      color: "#565050",
    },
  },
  searchBtn: {
    backgroundColor: "#fff",
    color: "#565050",
    padding: "5px 30px",
    "&:hover": {
      backgroundColor: "#565050",
      color: "#fff",
    },
  },
  slider: {
    color: "#52af77",
    "& .MuiSlider-root": {
      height: "100px",
    },
  },
  "MuiSlider-track": {
    height: 4,
    borderRadius: 2,
  },
  genreItemCheckbox: {},
  dialogBody: {
    display: "flex",
    flexDirection: "column",
  },
  dialogContent: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: "#565050",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
      overflow: "hidden",
    },
  },
  dialogActions: {
    display: "flex",
    alignItems: "flex-end",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
      alignItems: "center",
    },
  },
  clearBtn: {
    backgroundColor: "#fff",
    color: "#565050",
    padding: "5px 30px",
    "&:hover": {
      backgroundColor: "#565050",
      color: "#fff",
    },
  },
  createForm: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  }
});
