import { CardHeader } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useTheme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import SvgIcon from "@mui/material/SvgIcon";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React, { useEffect } from 'react';
import { ReactComponent as Monster } from "../assets/monster.svg";
import MainStats from '../components/MonsterInfo/MainStats';
import SpellCasting from '../components/MonsterInfo/SpellCasting';
import { readMonsterFile } from '../utilities/MonsterTranslator';
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
    'max-height': '90vh',
    'overflow-y': 'auto',
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
  'MuiCardHeader-root': {

  },
  cardheader: {
    display: 'inline-flex',
    'align-items': 'center',
    background: theme.palette.primary.main,
    width: '100%',
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
  const [monster, setMonster] = React.useState(null);

  //helper functions
  const isSubtype = () => {
    let subtype = "";
    if (props.monster) {
      if (props.monster.subtype)
        subtype = subtype.concat("(" + props.monster.subtype + ")");
    } else if (monster.subtype) {
      subtype = subtype.concat("(" + monster.subtype + ")");
    }
    return subtype;
  };

  useEffect(() => {
    let monsterList = readMonsterFile();
    if (props.match) {
      setMonster(...monsterList.filter(e => e.name === props.match.params.id));
    }
  });

  return (
    <div>
      <Card className={classes.cardwidth}>
        {props.monster &&
          <CardHeader className={classes.cardheader}
            title={
              <div className={classes.cardheader}>
                <Typography variant="h4">
                  {/* <SvgIcon
                    style={{ "font-size": "1.5em" }}
                    color="action"
                  >
                    <Monster />
                  </SvgIcon> */}
                </Typography>
                <Typography variant="h4" gutterBottom>
                  {props.monster.name}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  &nbsp;( {props.monster.size} - {props.monster.type}
                  {isSubtype()}, {props.monster.alignment} )
                </Typography>
              </div>
            }>
          </CardHeader>}
        {monster &&
          <CardHeader className={classes.cardheader}
            title={
              <div className={classes.cardheader}>
                <Typography variant="h4">
                  <SvgIcon
                    style={{ "font-size": "1.5em" }}
                    color="action"
                  >
                    <Monster />
                  </SvgIcon>
                </Typography>
                <Typography variant="h4" gutterBottom>
                  {monster.name}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  &nbsp;( {monster.size} - {monster.type}
                  {isSubtype()}, {monster.alignment} )
                </Typography>
              </div>
            }>
          </CardHeader>}
        {props.monster &&
          <CardContent>
            <MainStats monster={props.monster} />
            <SpellCasting monster={props.monster} />
            <ActionsReactions monster={props.monster} />
            <LegendaryLair monster={props.monster} />
          </CardContent>
        }
        {monster &&
          <CardContent>
            <MainStats monster={monster} />
            <SpellCasting monster={monster} />
            <ActionsReactions monster={monster} />
            <LegendaryLair monster={monster} />
          </CardContent>
        }
      </Card>
    </div>
  );
}
