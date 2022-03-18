import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import { useTheme } from "@mui/material/styles";
import makeStyles from '@mui/styles/makeStyles';
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React, { useEffect } from "react";
import { map } from "rxjs/operators";
import { loadSpellData } from "../../services/SpellService";
import { ReactComponent as Fireball } from "../assets/fire-ball.svg";
import SvgIcon from "@mui/material/SvgIcon";

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

  background: {
    "background-color": theme.palette.spell.main,
  },
}));

export default function SpellInfo(props) {
  const theme = useTheme();
  const classes = useStyles(theme);
  const [spell, setSpell] = React.useState();



  useEffect(() => {
    if (props.match) {
      loadSpellData(props.match.params.id)
        .pipe(
          map((spell) => {
            setSpell(spell);
          })
        )
        .subscribe();
    } else if (props.id) {
      setSpell(props.selectedSpell)
    }
  }, props);

  const handleBackClick = () => {
    props.history.goBack();
  };

  return (
    <Card className={classes.root}>
      {spell && (
        <div>
          <Toolbar className={classes.background}>
            <Typography variant="h4">
              <SvgIcon
                style={{ "font-size": "1.5em" }}
                color="action"
              >
                <Fireball />
              </SvgIcon>
            </Typography>
            {/* <IconButton
            onClick={handleBackClick}
            edge="start"
            color="inherit"
            aria-label="back"
          >
            <ArrowBackIcon />
          </IconButton> */}
            <Typography variant="h4" gutterBottom>
              {spell.name}
            </Typography>
          </Toolbar>
          <CardContent>
            <div>
              <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="flex-start"
                container
                spacing={1}
              >
                <Grid item xs={3}>
                  LEVEL
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
                justifyContent="center"
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
              <p>
                {spell.desc.map((description, index) => (
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
