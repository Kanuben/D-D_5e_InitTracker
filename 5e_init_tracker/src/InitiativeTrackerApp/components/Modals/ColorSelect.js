import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Brightness1Icon from '@material-ui/icons/Brightness1';
import FormatColorResetIcon from '@material-ui/icons/FormatColorReset';
import React from 'react';

const useStyles = makeStyles(theme => ({
  typography: {
    padding: theme.spacing(2),
  },
  colorSwatchContainer: {
    width: "55px",
    padding: "2%"
  },

  swatches: {
    margin: "2%",
    cursor: "pointer"
  },

}));

export default function ColorSelect(props) {
  const classes = useStyles();

  const handleClick = (color) => {
    props.handleColorSelectClose();
    props.getColor(color)
  }

  return (
    <div className={classes.typography, classes.colorSwatchContainer}>
      <div>
        <FormatColorResetIcon className={classes.swatches} onClick={() => handleClick("")} />
        <Brightness1Icon className={classes.swatches} style={{ color: "#DE4C4C" }} onClick={() => handleClick("linear-gradient(90deg, rgba(222,76,76,1) 5%, rgba(66,66,66,1) 20%)")} />
        <Brightness1Icon className={classes.swatches} style={{ color: "#4C4CDE" }} onClick={() => handleClick("linear-gradient(90deg, rgba(76,76,222,1) 5%, rgba(66,66,66,1) 20%)")} />
        <Brightness1Icon className={classes.swatches} style={{ color: "#4CDE4C" }} onClick={() => handleClick("linear-gradient(90deg, rgba(76,222,76,1) 5%, rgba(66,66,66,1) 20%)")} />
        <Brightness1Icon className={classes.swatches} style={{ color: "#4CDEDE" }} onClick={() => handleClick("linear-gradient(90deg, rgba(76,222,222,1) 5%, rgba(66,66,66,1) 20%)")} />
        <Brightness1Icon className={classes.swatches} style={{ color: "#DE4CDE" }} onClick={() => handleClick("linear-gradient(90deg, rgba(222,76,222,1) 5%, rgba(66,66,66,1) 20%)")} />
      </div>
    </div>
  );
}
