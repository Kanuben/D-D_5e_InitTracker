import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';

const useStyles = makeStyles (theme => ({
  cardwidth: {
    width: 'inherit',
  },
  root: {
    flexGrow: 1,
  },
  char: {
    display: 'flex',
    'align-items': 'center',
  },
  charname: {
    padding: '.5em',
    'font-size': '1em',
  },
  col: {
    padding: theme.spacing (2),
    color: theme.palette.text.secondary,
    'align-items': 'center',
    display: 'inline-flex',
    'justify-items': 'center',
    'white-space': 'nowrap',
  },
  char_portrait: {
    width: theme.spacing (8),
    height: theme.spacing (8),
    'border-style': 'solid',
    'border-color': 'darkgrey',
    'border-width': '.25em',
  },
  paper_padding: {
    padding: '1em',
  },

  background_blue: {
    'background-color': 'blue',
  },
}));

export default function CharacterCard (props) {
  const [BgColor, setbgColor] = React.useState (false);
  const classes = useStyles ();

  function handleBgColor () {
    if (BgColor === true) setbgColor (false);
    else setbgColor (true);
  }

  const selected = '#3f51b5';
  const unselected = 'white';

  return (
    <Card
      className={classes.cardwidth}
      style={{backgroundColor: BgColor ? selected : unselected}}
      onClick={handleBgColor}
    >
      <CardContent>
        <div className={classes.align_center}>
          <Grid container spacing={5}>
            <Grid className={classes.col} item xs>
              <Avatar className={classes.char_portrait} src={props.img} />
              <div className={classes.charname}>
                <Typography variant="h6" gutterBottom>
                  {props.name}
                </Typography>
                <Typography variant="subtitle2" gutterBottom>
                  {props.role}: {props.isPlayer ? 'LVL ' : 'CR '}
                  {props.level}
                </Typography>
              </div>
            </Grid>

          </Grid>
        </div>
      </CardContent>
    </Card>
  );
}
