import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import React, { useEffect } from "react";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { map } from "rxjs/operators";
import { loadSpellData } from "../../services/SpellService";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import CardHeader from "@material-ui/core/CardHeader";

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
  const [spell, setSpell] = React.useState();

  useEffect(() => {
    loadSpellData(props.match.params.id)
      .pipe(
        map((spell) => {
          setSpell(spell);
        })
      )
      .subscribe();
  }, props);

  const handleBackClick = () => {
    props.history.goBack();
  };

  return (
    <Card className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            onClick={handleBackClick}
            edge="start"
            color="inherit"
            aria-label="back"
          >
            <ArrowBackIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <CardContent>
        {spell && (
          <div>
            <Typography variant="h4" gutterBottom>
              {spell.name}
            </Typography>
            <Divider />
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="flex-start"
              container
              spacing={1}
            >
              <Grid item xs={3}>
                Level
              </Grid>
              <Grid item xs={3}>
                CASTING TIME
              </Grid>
              <Grid item xs={3}>
                RANGE/AREA
              </Grid>
              <Grid item xs={3}>
                COMPONENTS
              </Grid>
              <Grid item xs={3}>
                {spell.level}
              </Grid>
              <Grid item xs={3}>
                {spell.casting_time}
              </Grid>
              <Grid item xs={3}>
                {spell.range}
              </Grid>
              <Grid item xs={3}>
                {spell.components.map((component, index) => (
                  <span>{component},</span>
                ))}
              </Grid>
            </Grid>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="flex-start"
              container
              spacing={1}
            >
              <Grid item xs={3}>
                DURATION
              </Grid>
              <Grid item xs={3}>
                SCHOOL
              </Grid>
              <Grid item xs={3}>
                ATTACK/SAVE
              </Grid>
              <Grid item xs={3}>
                DAMAGE/EFFECT
              </Grid>
              <Grid item xs={3}>
                {spell.duration}
              </Grid>
              <Grid item xs={3}>
                {spell.school.name}
              </Grid>
              {spell.dc && (
                <Grid item xs={3}>
                  {spell.dc.dc_type.name}
                </Grid>
              )}
              {spell.dc === undefined && (
                <Grid item xs={3}>
                  None
                </Grid>
              )}
              {spell.damage && (
                <Grid item xs={3}>
                  {spell.damage.damage_type.name}
                </Grid>
              )}
              {spell.damage === undefined && (
                <Grid item xs={3}>
                  None
                </Grid>
              )}
            </Grid>
            <Divider />
            <p>
              {spell.desc.map((description, index) => (
                <div>
                  <Typography variant="body2">{description}</Typography>
                  <br></br>
                </div>
              ))}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
