import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
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
    padding: '1em',
    'font-size': '2em',
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
    width: theme.spacing (12),
    height: theme.spacing (12),
    'border-style': 'solid',
    'border-color': 'darkgrey',
    'border-width': '.25em',
  },
  paper_padding: {
    padding: '2em',
  },
}));

export default function CharacterCard (props) {
  const classes = useStyles ();
  const {ipcRenderer} = window.require ('electron');


  const handleOpenNewMonsterWindow = () => {
    if (props.isPlayer === false) {
      ipcRenderer.send ('new-window', props.index);
    }
  };


 

  return (
    <Card className={classes.cardwidth}>
      <CardContent>
        <div className={classes.align_center}>
          <Grid container spacing={5}>
            <Grid className={classes.col} item xs>
              <Avatar
                className={classes.char_portrait}
                src={props.img}
                onClick={handleOpenNewMonsterWindow}
              />
              <div className={classes.charname}>
                <Typography variant="h6" gutterBottom>
                  {props.name}
                </Typography>
                <Typography variant="subtitle2" gutterBottom>
                  {props.type}: {props.isPlayer ? 'LVL ' : 'CR '}
                  {props.isPlayer === true && <span>{props.level}</span>}
                  {props.isPlayer === false &&
                    <span> {props.challenge_rating}</span>}
                </Typography>
              </div>
            </Grid>

            <Grid className={classes.col} item xs>
              <div>
                <Typography variant="subtitle2" gutterBottom>
                  Status
                </Typography>
                <Typography variant="h6" gutterBottom>
                  {props.status}
                </Typography>
              </div>
            </Grid>

            <Grid className={classes.col} item xs>
              <div>
                <Typography variant="subtitle2" gutterBottom>
                  AC
                </Typography>
                <Typography variant="h4" gutterBottom>
                  {props.armor_class}
                </Typography>
              </div>
            </Grid>

            <Grid className={classes.col} item xs>
              <div>
                <Typography variant="subtitle2" gutterBottom>
                  Damage
                </Typography>
                <Typography variant="h4" gutterBottom>
                  0/{props.hit_points}
                </Typography>
              </div>
            </Grid>

            <Grid className={classes.col} item xs>
              <div>
                {/* <Typography variant="subtitle2" gutterBottom>
                  Initiative
                </Typography> */}
                <TextField
                  value = {props.initiative}
                  id="outlined-basic"
                  variant="outlined"
                />
              </div>
            </Grid>
          </Grid>
        </div>
      </CardContent>
    </Card>
  );
}
