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

class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  showCheckboxList = () => {
    return this.props.genres.map((item) => {
      return (
        <FormControlLabel
          key={item.id}
          control={
            <Checkbox
              className={this.props.classes.genreItemCheckbox}
              value="remember"
              color="primary"
              style={{ color: "#565050" }}
              id={`${item.id}`}
              className={this.props.classes.genreItem}
            />
          }
          label={item.name}
          onChange={this.handleCheckboxChange}
          className={this.props.classes.genreItem}
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
  handleClickOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };

  handlePopularityChange = (event, value) =>{ this.setState({ popularity:value })};
  handleAverageChange = (event, value) =>{ this.setState({ average:value })};

  searchMovie = () => {
    this.props.searchMovies(this.state)
  };
  render() {
    const { classes } = this.props;
    console.log(this.state)
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
                      id="title"
                      className={classes.dialogInput}
                      variant="outlined"
                      label="Title"
                      onChange={this.changeHandler}
                    />
                  </Box>
                  <Box className={classes.overBox}>
                    <Typography component="p" className={classes.dialogText}>
                      Overview
                    </Typography>
                    <TextField
                      className={classes.dialogInput}
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
                      defaultValue={100}
                      min={100}
                      max={2000}
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
