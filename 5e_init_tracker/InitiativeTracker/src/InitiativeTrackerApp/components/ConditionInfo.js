import AppBar from "@mui/material/AppBar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import makeStyles from "@mui/styles/makeStyles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React, { useEffect } from "react";
import { map } from "rxjs/operators";
import { loadConditionData } from "../../services/ConditionService";

const useStyles = makeStyles((theme) => ({
  cardwidth: {
    width: "inherit",
  },
  root: {
    flexGrow: 1,
  },
  char: {
    display: "flex",
    "align-items": "center",
  },
  charname: {
    padding: ".5em",
    "font-size": "1em",
  },
  col: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
    "align-items": "center",
    display: "inline-flex",
    "justify-items": "center",
    "white-space": "nowrap",
  },
  char_portrait: {
    width: theme.spacing(8),
    height: theme.spacing(8),
    "border-style": "solid",
    "border-color": "darkgrey",
    "border-width": ".25em",
  },
  paper_padding: {
    padding: "1em",
  },

  background_blue: {
    "background-color": "blue",
  },
}));

export default function ConditionCard(props) {
  const classes = useStyles();
  const [condition, setCondition] = React.useState();

  useEffect(() => {
    loadConditionData(props.id)
      .pipe(
        map((conditon) => {
          setCondition(conditon);
        })
      )
      .subscribe();
  }, props);

  const handleBackClick = () => {
    props.history.goBack();
  };

  return (
    <Card className={classes.root}>
      {condition && (
        <div>
          <Toolbar>
            <Typography variant="h4" gutterBottom>
              {condition.name}
            </Typography>
          </Toolbar>
          <CardContent>
            <div>
              {condition.desc.map((description, index) => (
                <div>
                  <Typography variant="body2">{description}</Typography>
                  <br></br>
                </div>
              ))}
            </div>
          </CardContent>
        </div>
      )}
    </Card>
  );
}
