import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import { useTheme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import Typography from '@mui/material/Typography';
import React, { useEffect } from 'react';
import List from '@mui/material/List';
import Checkbox from '@mui/material/Checkbox';

const useStyles = makeStyles(theme => ({
  popover: {
    pointerEvents: 'none',
  },
  link: {
    color: theme.palette.secondary.main,
  },
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
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
    'align-items': 'center',
    display: 'inline-flex',
    'justify-items': 'center',
    'white-space': 'nowrap',
  },
  char_portrait: {
    width: theme.spacing(8),
    height: theme.spacing(8),
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
  headingColor: {
    color: theme.palette.secondary.main,
    'font-weight': 'bold',
  },
}));

export default function LegendaryLair(props) {
  const theme = useTheme();
  const classes = useStyles(theme);

  let legendaryActions = [];

  if (props.monster) {
    if (props.monster.legendary_actions.actions !== undefined) {
      props.monster.legendary_actions.actions.forEach(item => {
        legendaryActions.push(item);
      });
    }
  }

  return (
    <div>
      {legendaryActions.length !== 0 &&
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="h6">Legendary Actions</Typography>

          {/* {props.monster.legendary_actions.actions_per_turn.map(
            (item, index) => <Checkbox />
          )} */}
        </div>}
      <List>
        {legendaryActions.map((item, index) => (
          <ListItem dense={true}>
            <div>
              <Typography variant="body1" className={classes.headingColor}>
                {item.name}:

              </Typography>
              <Typography variant="body2"> {item.desc} </Typography>
            </div>
          </ListItem>
        ))}
      </List>

      {props.monster.lair_actions.length !== 0 &&
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Divider />
          <Typography variant="h6">Lair Actions</Typography>

          {/* {props.monster.legendary_actions.actions_per_turn.map(
            (item, index) => <Checkbox />
          )} */}
        </div>}
      <List>
        {props.monster.lair_actions.map((item, index) => (
          <ListItem dense={true}>
            <div>
              <Typography variant="body1" className={classes.headingColor}>
                {item.name}:

              </Typography>
              <Typography variant="body2"> {item.desc} </Typography>
            </div>
          </ListItem>
        ))}
      </List>
    </div>
  );
}
