import React from "react";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import LinearProgress from "@material-ui/core/LinearProgress";
import Alert from "@material-ui/lab/Alert";
import MuiAlert from "@material-ui/lab/Alert";
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
  Snackbar,
} from "@material-ui/core";
import { RegisterStyles } from "./RegisterStyles";
import { compose } from "redux";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { register } from "./../../../store/actions/authAction";
import { setNotification } from "../../../store/actions/authAction";
import { required, minValue6, email } from "./../../utils/validate";

function AlertField(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const renderEmailField = ({ input, meta: { touched, error, warning } }) => {
  return (
    <Grid item xs={12}>
      <TextField
        variant="outlined"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        {...input}
      />
      {touched && error && <AlertField severity="error">{error}</AlertField>}
    </Grid>
  );
};

const renderPasswordField = ({ input, meta: { touched, error, warning } }) => {
  return (
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
        {...input}
      />
      {touched && error && <span>{error}</span>}
    </Grid>
  );
};

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      open: false,
    };
  }

  submit = (values) => {
    return this.props.register(values);
  };

  showLoading = () => {
    if (this.props.isLoading) {
      return <LinearProgress className={this.props.classes.authLoading} />;
    }
  };
  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({
      open: false,
    });
    this.props.setNotification(null);
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
  };

  showError = () => {
    if (this.props.error) {
      return (
        <Snackbar
          open={!!this.props.error}
          autoHideDuration={3000}
          onClose={this.handleClose}
        >
          {this.props.error ? (
            <Alert severity="error">{this.props.error}</Alert>
          ) : (
            <Alert onClose={this.handleClose} severity="success">
              {this.props.error}
            </Alert>
          )}
        </Snackbar>
      );
    }
  };

  render() {
    const { classes, handleSubmit, pristine, submitting } = this.props;
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
            onSubmit={handleSubmit(this.submit)}
            noValidate
          >
            <Grid container spacing={2}>
              <Field
                name="email"
                component={renderEmailField}
                validate={[required, email]}
              />
              <Field
                name="password"
                component={renderPasswordField}
                validate={[required, minValue6]}
              />
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={pristine || submitting}
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
          {this.showError()}
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
  setNotification: (payload) => dispatch(setNotification(payload)),
});

export default compose(
  withStyles(RegisterStyles, { withTheme: true }),
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: "register",
  })
)(Register);
