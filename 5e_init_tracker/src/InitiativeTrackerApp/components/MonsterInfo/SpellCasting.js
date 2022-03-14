import { ListItemText } from '@mui/material';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Popover from '@mui/material/Popover';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import makeStyles from '@mui/styles/makeStyles';
import React from 'react';
import { map } from "rxjs/operators";
import { loadSpellData } from "../../../services/SpellService";
import SpellInfo from '../SpellInfo';

const useStyles = makeStyles(theme => ({
  popover: {
  },
  link: {
    color: 'white',
    cursor: 'pointer',
    textDecoration: 'underline'
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
  headingColor: {
    color: theme.palette.secondary.main,
    "font-weight": "bold",
  },
  background_blue: {
    'background-color': 'blue',
  },
}));

export default function SpellCasting(props) {
  const theme = useTheme();
  const classes = useStyles(theme);

  if (props.monster) {
    props.monster.spell_casting.spells.forEach(spell => {
      if (spell.url) {
        spell.url = spell.url.substring(spell.url.lastIndexOf("/") + 1);
      }
    });
  }

  const [anchorEl, setAnchorEl] = React.useState({});
  const [openedPopoverId, setOpenedPopoverId] = React.useState({});
  const [selectedSpell, setSelectedSpell] = React.useState({});

  const handlePopoverOpen = (event, popoverItem) => {
    setAnchorEl(event.currentTarget);
    loadSpellData(popoverItem.url)
      .pipe(
        map((spell) => {
          setSelectedSpell(spell);
          setOpenedPopoverId(popoverItem.name);
        })
      )
      .subscribe();

  };

  const handlePopoverClose = (event) => {
    setOpenedPopoverId(null);
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div>
      <List>
        {props.monster.spell_casting.spells.length !== 0 &&
          <div>
            {props.monster.spell_casting.spells.map((item, index) => (
              <ListItem>
                <div>
                  {index == 0 &&
                    <ListItemText>
                      <div>
                        <Typography className={classes.headingColor} variant="body1">{item.level > 0 ? 'Level ' + item.level : 'Cantrips:'}</Typography>
                      </div>
                    </ListItemText>
                  }
                  {index > 0 && props.monster.spell_casting.spells[index - 1].level != item.level &&
                    <ListItemText>
                      <div>
                        <Typography className={classes.headingColor} variant="body1">Level {item.level}:</Typography>
                      </div>
                    </ListItemText>
                  }
                  <span>&nbsp;</span>
                  <a
                    className={classes.link}
                    aria-owns={open ? 'mouse-over-popover' : undefined}
                    aria-haspopup="true"
                    onClick={e => handlePopoverOpen(e, item)}
                  >
                    {item.name}
                  </a>
                  <Popover
                    id={item.name}
                    className={classes.popover}
                    classes={{
                      paper: classes.paper,
                    }}
                    open={openedPopoverId === item.name}
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'left',
                    }}
                    PaperProps={{
                      style: { maxWidth: '800px' },
                    }}
                    onClose={handlePopoverClose}
                    disableRestoreFocus
                  >
                    <SpellInfo selectedSpell={selectedSpell} id={item.url} />
                  </Popover>
                </div>
              </ListItem>
            ))}
            <Divider />
          </div>}
      </List>

    </div>
  );
}
