import React from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
class GenresCheckbox extends React.Component {
  render() {
    const {
      name,
      id,
      genreItemCheckboxStyle,
      genreItemStyle,
      handleGenresChange,
    } = this.props;
    return (
      <FormControlLabel
        control={
          <Checkbox
            value="remember"
            color="primary"
            style={{ color: "#565050" }}
            id={`${id}`}
            className={genreItemCheckboxStyle}
          />
        }
        label={name}
        onChange={handleGenresChange}
        className={genreItemStyle}
      />
    );
  }
}

export default GenresCheckbox;
