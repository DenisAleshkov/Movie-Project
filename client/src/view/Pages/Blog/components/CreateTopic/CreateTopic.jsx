import React, { Component } from "react";
import {
  TextField,
  Box,
  withStyles,
  Typography,
  Button,
  Snackbar,
  CircularProgress,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { CreateTopicStyle } from "./CreateTopicStyle";

class CreateTopic extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
    };
  }
  handleClick = () => {
    this.setState({ open: true });
  };

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.props.setNotification(null);
    this.setState({ open: false });
  };
  changeHandler = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };
  submitHandler = (e) => {
    e.preventDefault();
    this.props.createTopic(this.state, {
      userId: this.props.id,
      fName: this.props.firstName,
      lName: this.props.lastName,
    });
  };
  showNotification = () => {
    if (this.props.notification) {
      return (
        <Snackbar
          open={!!this.props.notification}
          autoHideDuration={3000}
          onClose={this.handleClose}
          className={this.props.classes.notifSnackbar}
        >
          {this.props.notification && this.props.notification.error ? (
            <Alert severity="error">{this.props.notification.message}</Alert>
          ) : (
            <Alert onClose={this.handleClose} severity="success">
              {this.props.notification.message}
            </Alert>
          )}
        </Snackbar>
      );
    }
  };
  render() {
    const { classes, isNotificationLoading } = this.props;
    return (
      <Box className={classes.boxForm}>
        <form
          className={classes.createTopic}
          noValidate
          autoComplete="off"
          onSubmit={this.submitHandler}
        >
          <Typography variant="h3" component="h2" gutterBottom>
            CreateTopic
          </Typography>
          <div>
            <TextField
              id="title"
              label="Title"
              style={{ margin: 8 }}
              placeholder="Enter title"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={this.changeHandler}
            />
          </div>
          <div>
            <TextField
              id="description"
              label="Title"
              multiline
              rows={4}
              placeholder="Enter descrtiption"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              onChange={this.changeHandler}
            />
          </div>
          <div className={classes.createBtnBox}>
            <Button
              className={classes.createBtn}
              onClick={this.submitHandler}
              variant="outlined"
            >
              Create
            </Button>
          </div>
        </form>
        {isNotificationLoading ? (
          <CircularProgress className={classes.notifLoader} />
        ) : (
          this.showNotification()
        )}
      </Box>
    );
  }
}

export default withStyles(CreateTopicStyle, { withTheme: true })(CreateTopic);
