import React, { Component } from "react";
import axios from "axios";
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
  Radio,
} from "@material-ui/core";
import { SearchFormStyles } from "./CreateFormStyle";
import { reduxForm, Field } from "redux-form";
import { compose } from "redux";

const renderCheckbox = ({ input: { onChange, value, checked }, ...props }) => {
  return (
    <div>
      <Radio
        color="primary"
        style={{ color: "#565050" }}
        className={{
          border: "2px solid #565050",
        }}
        checked={checked}
        onChange={() => onChange(value)}
      />
      <span>{value.name}</span>
    </div>
  );
};

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
  showСities = () =>
    this.props.cities.map((item) => (
      <Field
        name={`city`}
        component={renderCheckbox}
        type="radio"
        value={item}
        passProps={{ item }}
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
  handleClickOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };

  searchMovie = () => {
    if (this.props.location === "/home/movie") {
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

  submit = (values) => {
    this.props.searchEventsByCity(values.city.id, this.props.history);
  };

  render() {
    const { classes, handleSubmit } = this.props;
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
            Create Event
          </Button>
        </div>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <Box className={classes.dialogForm}>
            <Box className={classes.dialogBody}>
              <DialogContent className={classes.dialogContent}>
                <Box className={classes.genreslist}>{this.showСities()}</Box>
              </DialogContent>
              <DialogActions className={classes.dialogActions}>
                <Box>
                <TextField required id="standard-required" label="Required" defaultValue="Hello World" />
                  <TextField
                    id="standard-multiline-flexible"
                    label="Multiline"
                    multiline
                    rowsMax={4}
                  />
                 
                  <Button
                    color="primary"
                    className={classes.searchBtn}
                    onClick={handleSubmit(this.submit)}
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

export default compose(
  withStyles(SearchFormStyles, { withTheme: true }),
  reduxForm({
    form: "search-form",
  })
)(SearchForm);
