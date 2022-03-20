import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import makeStyles from "@mui/styles/makeStyles";
import SvgIcon from "@mui/material/SvgIcon";
import Typography from "@mui/material/Typography";
import React from "react";
import { ReactComponent as Demo } from "../assets/demo.svg";
import MonsterInfo from "./MonsterInfo/MonsterInfo";
import Popover from "@mui/material/Popover";

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
    cursor: "pointer",
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

  const [anchorEl, setAnchorEl] = React.useState({});
  const [openedPopoverId, setOpenedPopoverId] = React.useState({});

  const handlePopoverOpen = (event) => {
    if (props.character.isPlayer === false) {
      setAnchorEl(event.currentTarget);
      setOpenedPopoverId(props.character.name);
    }
  };

  const handlePopoverClose = (event) => {
    setOpenedPopoverId(null);
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <Card
      className={classes.cardwidth}
      onClick={() => {
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
                onClick={handlePopoverOpen}
              >
                <SvgIcon>
                  <Demo />
                </SvgIcon>
              </Avatar>
              <Popover
                id={props.character.name}
                className={classes.popover}
                classes={{
                  paper: classes.paper,
                }}
                open={openedPopoverId === props.character.name}
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                PaperProps={{
                  style: { maxWidth: "800px" },
                }}
                onClose={handlePopoverClose}
                disableRestoreFocus
              >
                <MonsterInfo monster={props.character} />
              </Popover>
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
            <Grid className={classes.col} item xs>
              {props.character.isPlayer === false && (
                <Typography variant="h6" gutterBottom>
                  Source: {props.character.source}
                </Typography>
              )}
            </Grid>
          </Grid>
        </div>
      </CardContent>
    </Card>
  );
}
