import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import makeStyles from '@mui/styles/makeStyles';
import SvgIcon from "@mui/material/SvgIcon";
import Typography from "@mui/material/Typography";
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

export default function SpellCard(props) {
  const classes = useStyles();



  return (
    <Card
      className={classes.cardwidth}
    >
      <CardContent>
        <div className={classes.align_center}>
          <Grid container spacing={5}>
            <Grid className={classes.col} item xs>
              <Avatar
                className={classes.char_portrait}
                src={props.spell.img}
              >
                <SvgIcon>
                  <Demo />
                </SvgIcon>
              </Avatar>
              <div className={classes.charname}>
                <Typography variant="h6" gutterBottom>
                  {props.spell.name}
                </Typography>
              </div>
            </Grid>
          </Grid>
        </div>
      </CardContent>
    </Card>
  );
}
