import React, { Component } from "react";
import axios from "axios";
import CustomizedSlider from "./SliderStyle";
import SearchIcon from "@material-ui/icons/Search";
import { DropzoneArea } from "material-ui-dropzone";
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
  CircularProgress,
  Backdrop,
} from "@material-ui/core";
import { SearchFormStyles } from "./CreateFormStyle";
import { reduxForm, Field } from "redux-form";
import { createEvent } from "./../../../../../../../store/actions/movieAction";
import { useDispatch, useSelector } from "react-redux";
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

const renderStatusInput = ({ input: { onChange, value, checked } }) => {
  return (
    <div>
      <Checkbox checked={checked} onChange={() => onChange(!checked)} />{" "}
      <span>status</span>
    </div>
  );
};

const renderInput = ({ input: { onChange, value }, ...props }) => {
  return (
    <TextField
      required
      style={{ width: "100%" }}
      id={props.label}
      label={props.label}
      onChange={onChange}
      value={value}
    />
  );
};

const SearchForm = (props) => {
  const { classes, handleSubmit, change } = props;
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const renderСities = () =>
    props.cities.map((item) => (
      <Field
        name={`city`}
        component={renderCheckbox}
        type="radio"
        value={item}
        passProps={{ item }}
      />
    ));

  const renderTypes = () =>
    props.types.map((item) => (
      <Field
        name={`type`}
        component={renderCheckbox}
        type="radio"
        value={item}
        passProps={{ item }}
      />
    ));

  const handleClickOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const submit = (values) => {
    dispatch(createEvent(values));
    handleClose();
  };

  return (
    <>
      <div className={classes.search}>
        <SearchIcon onClick={handleClickOpen} className={classes.searchIcon} />
        <Button
          placeholder="Search…"
          className={classes.searchButton}
          onClick={handleClickOpen}
          id="searchText"
        >
          Create Event
        </Button>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <Box className={classes.dialogForm}>
          <Box className={classes.dialogBody}>
            <DialogActions className={classes.dialogActions}>
              <Box className={classes.createForm}>
                <Field name="title" label="title" component={renderInput} />
                <Field
                  name="description"
                  label="description"
                  component={renderInput}
                />
                <Field name="name" label="name" component={renderInput} />
                <Field name="price" label="price" component={renderInput} />
                <Field
                  name="location"
                  label="location"
                  component={renderInput}
                />
                <Field name="status" component={renderStatusInput} />
                <DialogContent className={classes.dialogContent}>
                  <Box className={classes.genreslist}>{renderСities()}</Box>
                </DialogContent>
                <DialogContent className={classes.dialogContent}>
                  <Box className={classes.genreslist}>{renderTypes()}</Box>
                </DialogContent>
                <DropzoneArea
                  onChange={(files) =>
                    files && files.length && change("img", files[0])
                  }
                />
                <Button
                  color="primary"
                  className={classes.searchBtn}
                  onClick={handleSubmit(submit)}
                >
                  Create
                </Button>
              </Box>
            </DialogActions>
          </Box>
        </Box>
      </Dialog>
    </>
  );
};

export default compose(
  withStyles(SearchFormStyles, { withTheme: true }),
  reduxForm({
    form: "search-form",
  })
)(SearchForm);
