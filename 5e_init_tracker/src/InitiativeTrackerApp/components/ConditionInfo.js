import AppBar from "@material-ui/core/AppBar";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
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

export default function SpellCard(props) {
  const classes = useStyles();
  const [condition, setCondition] = React.useState();

  useEffect(() => {
    loadConditionData(props.match.params.id)
      .pipe(
        map((condition) => {
          setCondition(condition);
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
          <AppBar position="fixed">
            <Toolbar>
              <Typography variant="h4" gutterBottom>
                {condition.name}
              </Typography>
            </Toolbar>
          </AppBar>
          <Toolbar />
          <CardContent>
            <div>
              <p>
                {condition.desc.map((description, index) => (
                  <div>
                    <Typography variant="body2">{description}</Typography>
                    <br></br>
                  </div>
                ))}
              </p>
            </div>
          </CardContent>
        </div>
      )}
    </Card>
  );
}
