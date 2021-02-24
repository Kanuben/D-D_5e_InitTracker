import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import SvgIcon from "@material-ui/core/SvgIcon";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { ReactComponent as Demo } from "../assets/demo.svg";

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

export default function CharacterCard(props) {
  const classes = useStyles();
  const { ipcRenderer } = window.require("electron");

  const handleOpenNewMonsterWindow = () => {
    if (props.character.isPlayer === false) {
      ipcRenderer.send("new-window", "monster", props.character.index);
    }
  };

  return (
    <Card
      className={classes.cardwidth}
      onClick={() => {
        console.log(props.selected);
        if (props.selected === false) {
          props.addToSelectedList(props.character);
        } else {
          //props.removeFromSelectedList(props.character);
        }
      }}
    >
      <CardContent>
        <div className={classes.align_center}>
          <Grid container spacing={5}>
            <Grid className={classes.col} item xs>
              <Avatar
                className={classes.char_portrait}
                src={props.character.img}
                onClick={handleOpenNewMonsterWindow}
              >
                <SvgIcon>
                  <Demo />
                </SvgIcon>
              </Avatar>
              <div className={classes.charname}>
                <Typography variant="h6" gutterBottom>
                  {props.character.name}
                </Typography>
                <Typography variant="subtitle2" gutterBottom>
                  {props.character.type}:{" "}
                  {props.character.isPlayer ? "LVL " : "CR "}
                  {props.character.isPlayer === true && (
                    <span>{props.character.level}</span>
                  )}
                  {props.character.isPlayer === false && (
                    <span> {props.character.challenge_rating}</span>
                  )}
                </Typography>
              </div>
            </Grid>
          </Grid>
        </div>
      </CardContent>
    </Card>
  );
}
