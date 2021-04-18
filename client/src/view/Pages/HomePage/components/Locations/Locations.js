import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";
import TagFacesIcon from "@material-ui/icons/TagFaces";
import {
  getEventsByLocation,
  getLocationInCity,
  searchEventsByCity
} from "../../../../../store/actions/movieAction";
import { useSelector, useDispatch } from "react-redux";
import { reduxForm, Field } from "redux-form";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "transparent",
    zIndex: 34,
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: theme.spacing(0.5),
    margin: 0,
    position: "absolute",
    top: 0,
    boxShadow: "initial",
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));

function ChipsArray() {
  const dispatch = useDispatch();
  const city = useSelector((state) => state.MoviesReducer.city);
  const locations = useSelector((state) => state.MoviesReducer.locations);

  React.useEffect(() => {
    dispatch(getLocationInCity(city));
  }, [city]);
  const classes = useStyles();
  const onClickHandler = (id) => {
    dispatch(getEventsByLocation(id));
  };
  const showAll = () => {
    dispatch(searchEventsByCity(city));
  };
  return (
    <Paper component="ul" className={classes.root}>
      {locations &&
        locations.map((data) => {
          return (
            <li key={data.id}>
              <Field
                name={`${data.id}`}
                component={() => {
                  return (
                    <Chip
                      className={classes.chip}
                      avatar={<Avatar>M</Avatar>}
                      label={data.name}
                      onClick={() => {
                        onClickHandler(data.id);
                      }}
                    />
                  );
                }}
              />
            </li>
          );
        })}
      <Chip
        className={classes.chip}
        avatar={<Avatar>M</Avatar>}
        label="Show All"
        onClick={showAll}
      />
    </Paper>
  );
}

export default reduxForm({
  name: "type-form",
})(ChipsArray);
