import React from "react";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import LinearProgress from "@material-ui/core/LinearProgress";
import Alert from '@material-ui/lab/Alert';
import { Link } from "react-router-dom";
import {
  withStyles,
  CssBaseline,
  Button,
  Avatar,
  TextField,
  Grid,
  Container,
  Typography,
  Snackbar 
} from "@material-ui/core";
import { RegisterStyles } from "./RegisterStyles";
import { compose } from "redux";
import { connect } from "react-redux";
import { register } from "./../../../store/actions/authAction";
import { setNotification } from "../../../store/actions/authAction";
class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      open: false
    };
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.register(this.state);
  };
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };
  showLoading = () => {
    if (this.props.isLoading) {
      return <LinearProgress className={this.props.classes.authLoading} />;
    }
  };
  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({
      open: false
    })
    this.props.setNotification(null)
  };
  showNotification = () => {
    if (this.props.notification) {
      return (
        <Snackbar
          open={!!this.props.notification}
          autoHideDuration={3000}
          onClose={this.handleClose}
        >
          {this.props.error ? (
            <Alert severity="error">{this.props.error}</Alert>
          ) : (
            <Alert onClose={this.handleClose} severity="success">
              {this.props.notification}
            </Alert>
          )}
        </Snackbar>
      );
    }
  }
  render() {
    const { classes } = this.props;
    return (
      <Container component="div" maxWidth="xs">
        {this.showLoading()}
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <form
            className={classes.form}
            onSubmit={this.handleSubmit}
            noValidate
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lname"
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={this.handleChange}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link to="/auth/login">Already have an account? Sign in</Link>
              </Grid>
            </Grid>
          </form>
          {this.showNotification()}
        </div>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  error: state.AuthReducer.error,
  notification: state.AuthReducer.notification,
  isLoading: state.LoadingReducer.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
  register: (credentials) => dispatch(register(credentials)),
  setNotification: (payload) => dispatch(setNotification(payload))
});

export default compose(
  withStyles(RegisterStyles, { withTheme: true }),
  connect(mapStateToProps, mapDispatchToProps)
)(Register);
