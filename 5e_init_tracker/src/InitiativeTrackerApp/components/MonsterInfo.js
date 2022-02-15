import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import React, { useEffect } from 'react';
import { readMonsterFile } from '../utilities/MonsterTranslator';
import MainStats from '../components/MonsterInfo/MainStats';
import SpellCasting from '../components/MonsterInfo/SpellCasting';
import ActionsReactions from './MonsterInfo/ActionsReactions';
import LegendaryLair from './MonsterInfo/LegendaryLair';


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
}));

export default function MonsterInfo(props) {
  const theme = useTheme();
  const classes = useStyles(theme);
  const [monster, setMonster] = React.useState();

  useEffect(() => {
    let monsterList = readMonsterFile();
    setMonster(...monsterList.filter(e => e.name === props.match.params.id));
  }, props);

  return (
    <Card className={classes.cardwidth}>
      {monster &&
        <div>
          <CardContent>
            <MainStats monster={monster} />
            <SpellCasting monster={monster} />
            <ActionsReactions monster={monster} />
            <LegendaryLair monster={monster} />
          </CardContent>
        </div>}
    </Card>
  );
}
