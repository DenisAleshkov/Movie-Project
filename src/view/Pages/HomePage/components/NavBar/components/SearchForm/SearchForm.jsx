import React, { Component } from "react";
import CustomizedSlider from "./SliderStyle";
import SearchIcon from "@material-ui/icons/Search";
import {
  Box,
  withStyles,
  Checkbox,
  FormControlLabel,
  Typography,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
} from "@material-ui/core";
import { SearchFormStyles } from "./SearchFormStyle";

class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      adultCheckbox: false,
      idList: new Map(),
      popularity: 50,
      average: 1,
      title: "",
      overview: "",
    };
  }
  componentDidMount() {
    if (this.props.searchInputs) {
      const {
        title,
        average,
        idList,
        adultCheckbox,
        popularity,
        overview,
      } = this.props.searchInputs;
      this.setState({
        title,
        average,
        idList,
        adultCheckbox,
        popularity,
        overview,
      });
    }
  }
  showCheckboxList = () =>
    this.props.genres.map((item) => (
      <FormControlLabel
        key={item.id}
        control={
          <Checkbox
            name={item.name}
            color="primary"
            style={{ color: "#565050" }}
            id={`${item.id}`}
            className={this.props.classes.genreItemCheckbox}
            checked={!!this.state.idList.get(`${item.id}`)}
          />
        }
        label={item.name}
        onChange={this.handleGenresChange}
        className={this.props.classes.genreItem}
      />
    ));
  changeHandler = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };
  handleCheckboxChange = (e) => {
    this.setState({
      [e.target.id]: e.target.checked,
    });
  };
  handleGenresChange = (e) => {
    this.setState((prevState) => ({
      idList: prevState.idList.set(e.target.id, e.target.checked),
    }));
  };
  handleClickOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };

  handlePopularityChange = (event, value) => {
    this.setState({ popularity: value });
  };
  handleAverageChange = (event, value) => {
    this.setState({ average: value });
  };

  searchMovie = () => {
    if (this.props.location === "/home/events") {
      this.props.searchMovies(this.state, this.props.history);
    } else if (this.props.location === "/home/tv") {
      this.props.searchTV(this.state, this.props.history);
    }
  };
  clearInputs = () => {
    this.setState({
      open: false,
      adultCheckbox: false,
      idList: new Map(),
      popularity: 50,
      average: 1,
      title: "",
      overview: "",
    });
    this.props.setInputs(null);
  };
  render() {
    const { classes } = this.props;
    return (
      <>
        <div className={classes.search}>
          <SearchIcon
            onClick={this.handleClickOpen}
            className={classes.searchIcon}
          />
          <Button
            placeholder="Search…"
            className={classes.searchButton}
            onClick={this.handleClickOpen}
            id="searchText"
          >
            Search...
          </Button>
        </div>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <Box className={classes.dialogForm}>
            <Box className={classes.title}>
              <Typography component="h1" className={classes.titleText}>
                Title
              </Typography>
            </Box>
            <Box className={classes.dialogBody}>
              <DialogContent className={classes.dialogContent}>
                <Box className={classes.header}>
                  <Box className={classes.titleBox}>
                    <Typography component="p" className={classes.dialogText}>
                      Title
                    </Typography>
                    <TextField
                      className={classes.dialogInput}
                      value={this.state.title}
                      variant="outlined"
                      label="Title"
                      variant="outlined"
                      id="title"
                      onChange={this.changeHandler}
                    />
                  </Box>
                  <Box className={classes.overBox}>
                    <Typography component="p" className={classes.dialogText}>
                      Overview
                    </Typography>
                    <TextField
                      className={classes.dialogInput}
                      value={this.state.overview}
                      variant="outlined"
                      label="Overview"
                      multiline
                      rows={4}
                      variant="outlined"
                      id="overview"
                      onChange={this.changeHandler}
                    />
                  </Box>
                </Box>
                <Box className={classes.footer}>
                  <Box className={classes.progressPopularity}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          value="adult"
                          color="primary"
                          checked={this.state.adultCheckbox}
                          style={{ color: "#565050" }}
                          className={classes.adultCheckbox}
                          id="adultCheckbox"
                        />
                      }
                      label="Adult"
                      onChange={this.handleCheckboxChange}
                      className={classes.searchCheckbox}
                    />
                    <Typography component="p" className={classes.dialogText}>
                      Popularity
                    </Typography>
                    <CustomizedSlider
                      key={`popularity-${this.state.popularity}`}
                      defaultValue={this.state.popularity}
                      min={50}
                      max={5000}
                      color="#9a7b07"
                      id="popularity"
                      onChange={this.handlePopularityChange}
                    />
                  </Box>
                  <Box className={classes.progressAverage}>
                    <Typography
                      component="p"
                      className={classes.dialogText}
                      style={{ marginTop: 20 }}
                    >
                      Vote average
                    </Typography>
                    <CustomizedSlider
                      defaultValue={this.state.average}
                      key={`average-${this.state.average}`}
                      min={1}
                      max={10}
                      color="#0a8a26de"
                      id="average"
                      onChange={this.handleAverageChange}
                    />
                  </Box>
                </Box>
              </DialogContent>
              <DialogActions className={classes.dialogActions}>
                <Box className={classes.genreslist}>
                  {this.showCheckboxList()}
                </Box>
                <Box>
                  <FormControlLabel
                    control={
                      <Checkbox
                        value="remember"
                        color="primary"
                        style={{ color: "#565050" }}
                        className={classes.searchCheckbox}
                        id="searchCheckbox"
                      />
                    }
                    label="Remember inputs"
                    onChange={this.handleCheckboxChange}
                    className={classes.searchCheckbox}
                  />
                  <Button
                    color="primary"
                    className={classes.searchBtn}
                    onClick={this.searchMovie}
                  >
                    Search
                  </Button>
                  <Button
                    color="primary"
                    className={classes.clearBtn}
                    onClick={this.clearInputs}
                  >
                    Clear
                  </Button>
                </Box>
              </DialogActions>
            </Box>
          </Box>
        </Dialog>
      </>
    );
  }
}

export default withStyles(SearchFormStyles, { withTheme: true })(SearchForm);
