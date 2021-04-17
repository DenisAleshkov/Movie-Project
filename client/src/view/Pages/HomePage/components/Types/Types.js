import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";
import TagFacesIcon from "@material-ui/icons/TagFaces";
import { getEventByType } from "../../../../../store/actions/movieAction";
import { useSelector, useDispatch } from "react-redux";
import { reduxForm, Field } from "redux-form";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "transparent",
    position: "fixed",
    zIndex: 34,
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    flexDirection: "column",
    bottom: 0,
    right: "20px",
    listStyle: "none",
    padding: theme.spacing(0.5),
    margin: 0,
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));

function ChipsArray({ types }, ...props) {
  console.log("props", props);
  const dispatch = useDispatch();
  const onClickHandler = (typeId) => {
    dispatch(getEventByType(typeId));
  };
  const classes = useStyles();
  return (
    <Paper component="ul" className={classes.root}>
      {types &&
        types.map((data) => {
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
    </Paper>
  );
}

export default reduxForm({
  name: "type-form",
})(ChipsArray);
