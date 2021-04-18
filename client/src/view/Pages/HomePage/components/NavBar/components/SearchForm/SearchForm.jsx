import React, { Component } from "react";
import SearchIcon from "@material-ui/icons/Search";
import {
  Box,
  withStyles,
  Checkbox,
  FormControlLabel,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Radio,
} from "@material-ui/core";
import { SearchFormStyles } from "./SearchFormStyle";
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
    };
  }
  componentDidMount() {
    this.props.getCities();
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

  handleClickOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
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
            Search...
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
                  <Button
                    color="primary"
                    className={classes.searchBtn}
                    onClick={handleSubmit(this.submit)}
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

export default compose(
  withStyles(SearchFormStyles, { withTheme: true }),
  reduxForm({
    form: "search-form",
  })
)(SearchForm);
