import { Box, withStyles } from "@material-ui/core";
import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import SearchIcon from "@material-ui/icons/Search";
import Typography from "@material-ui/core/Typography";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { SearchFormStyles } from "./SearchFormStyle";
import Checkbox from "@material-ui/core/Checkbox";
import CustomizedSlider from "./SliderStyle";
import GenresCheckbox from "../GenresCheckbox/GenresCheckbox";
import { Flag } from "@material-ui/icons";

class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      adultCheckbox: false,
      idList: [],
      popularity: 50,
      average: 1,
      title: "",
      overview: "",
    };
  }
  showCheckboxList = () => {
    return this.props.genres.map((item) => {
      return (
        <GenresCheckbox
          key={item.id}
          genreItemCheckboxStyle={this.props.classes.genreItemCheckbox}
          genreItemStyle={this.props.classes.genreItem}
          id={item.id}
          name={item.name}
          handleGenresChange={this.handleGenresChange}
          idList={this.state.idList}
        />
      );
    });
  };
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
    this.setState({
      idList: [...this.state.idList, e.target.id],
    });
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
    if (this.props.location === "/home/movie") {
      this.props.searchMovies(this.state, this.props.history);
    } else if (this.props.location === "/home/tv") {
      this.props.searchTV(this.state, this.props.history);
    }
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
                      defaultValue={50}
                      min={50}
                      max={5000}
                      color="#9a7b07"
                      id="popularity"
                      value={this.state.value}
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
                      defaultValue={1}
                      min={1}
                      max={10}
                      color="#0a8a26de"
                      id="average"
                      value={this.state.value}
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
                    onClick={this.handleClose}
                    color="primary"
                    className={classes.searchBtn}
                    onClick={this.searchMovie}
                  >
                    Search
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
