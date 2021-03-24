import Checkbox from '@material-ui/core/Checkbox';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Popover from '@material-ui/core/Popover';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import SpellCard from '../SpellInfo';
import {CardContent} from '@material-ui/core';

const useStyles = makeStyles (theme => ({
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

export default function SpellCasting (props) {
  const theme = useTheme ();
  const classes = useStyles (theme);
  const {ipcRenderer} = window.require ('electron');

  let cantrips = [];
  let level1Spells = [];
  let level2Spells = [];
  let level3Spells = [];
  let level4Spells = [];
  let level5Spells = [];
  let level6Spells = [];
  let level7Spells = [];
  let level8Spells = [];
  let level9Spells = [];

  if (props.monster) {
    props.monster.spell_casting.spells.forEach (spell => {
      if (spell.level === 0) cantrips.push (spell);
      if (spell.level === 1) level1Spells.push (spell);
      if (spell.level === 2) level2Spells.push (spell);
      if (spell.level === 3) level3Spells.push (spell);
      if (spell.level === 4) level4Spells.push (spell);
      if (spell.level === 5) level5Spells.push (spell);
      if (spell.level === 6) level6Spells.push (spell);
      if (spell.level === 7) level7Spells.push (spell);
      if (spell.level === 8) level8Spells.push (spell);
      if (spell.level === 9) level9Spells.push (spell);
    });
  }

  const handleOpenNewSpellWindow = spellUrl => {
    ipcRenderer.send ('new-window', 'spell', spellUrl);
  };

  const [anchorEl, setAnchorEl] = React.useState (null);
  const [openedPopoverId, setOpenedPopoverId] = React.useState (null);

  const handlePopoverOpen = (event, popoverId) => {
    setOpenedPopoverId (popoverId);
    setAnchorEl (event.currentTarget);
  };

  const handlePopoverClose = () => {
    setOpenedPopoverId (null);
    setAnchorEl (null);
  };

  const open = Boolean (anchorEl);

  return (
    <div>
      {cantrips.length !== 0 &&
        <Typography variant="h6">Spells (Save DC: X, +X to hit)</Typography>}
        <List>

          {/* Cantrips */}
          {cantrips.length !== 0 &&
            <ListItem dense={true}>
              <div style={{display: 'inline-flex'}}>
                <Typography variant="body1">Cantrips:</Typography>
                {cantrips.map (item => (
                  <div>
                    <span>&nbsp;</span>
                    <Link
                      className={classes.link}
                      aria-owns={open ? 'mouse-over-popover' : undefined}
                      aria-haspopup="true"
                      onClick={() => handleOpenNewSpellWindow (item.url)}
                      onMouseEnter={e => handlePopoverOpen (e, item.name)}
                      onMouseLeave={handlePopoverClose}
                    >
                      {item.name},
                    </Link>
                    <Popover
                      id={item.name}
                      className={classes.popover}
                      classes={{
                        paper: classes.paper,
                      }}
                      open={openedPopoverId === item.name}
                      anchorEl={anchorEl}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                      }}
                      transformOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                      }}
                      onClose={handlePopoverClose}
                      disableRestoreFocus
                    >
                      <SpellCard id={item.url} />
                    </Popover>
                  </div>
                ))}
              </div>
            </ListItem>}
          
          {/* Level 1 */}
          {level1Spells.length !== 0 &&
            <ListItem dense={true}>
              <div style={{display: 'inline-flex'}}>
                <Typography variant="body1">Level 1:</Typography>
                {level1Spells.map (item => (
                  <div>
                    <span>&nbsp;</span>
                    <Link
                      className={classes.link}
                      aria-owns={open ? 'mouse-over-popover' : undefined}
                      aria-haspopup="true"
                      onClick={() => handleOpenNewSpellWindow (item.url)}
                      onMouseEnter={e => handlePopoverOpen (e, item.name)}
                      onMouseLeave={handlePopoverClose}
                    >
                      {item.name},
                    </Link>
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
                      onClose={handlePopoverClose}
                      disableRestoreFocus
                    >
                      <SpellCard id={item.url} />
                    </Popover>
                  </div>
                ))}
              </div>

              {props.monster.spell_casting.slots[0].map ((item, index) => (
                <Checkbox />
              ))}
            </ListItem>}
          
          {/* Level 2 */}
          {level2Spells.length !== 0 &&
            <ListItem dense={true}>
              <div style={{display: 'inline-flex'}}>
                <Typography variant="body1">Level 2:</Typography>
                {level2Spells.map ((item, index) => (
                  <div>
                    <span>&nbsp;</span>
                    <Link
                      className={classes.link}
                      aria-owns={open ? 'mouse-over-popover' : undefined}
                      aria-haspopup="true"
                      onClick={() => handleOpenNewSpellWindow (item.url)}
                      onMouseEnter={e => handlePopoverOpen (e, item.name)}
                      onMouseLeave={handlePopoverClose}
                    >
                      {item.name},
                    </Link>
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
                      onClose={handlePopoverClose}
                      disableRestoreFocus
                    >
                      <SpellCard id={item.url} />
                    </Popover>
                  </div>
                ))}
              </div>
              {props.monster.spell_casting.slots[1].map ((item, index) => (
                <Checkbox />
              ))}
            </ListItem>}
          
          {/* Level 3 */}
          {level3Spells.length !== 0 &&
            <ListItem dense={true}>
              <div style={{display: 'inline-flex'}}>
                <Typography variant="body1">Level 3:</Typography>
                {level3Spells.map ((item, index) => (
                  <div>
                    <span>&nbsp;</span>
                    <Link
                      className={classes.link}
                      aria-owns={open ? 'mouse-over-popover' : undefined}
                      aria-haspopup="true"
                      onClick={() => handleOpenNewSpellWindow (item.url)}
                      onMouseEnter={e => handlePopoverOpen (e, item.name)}
                      onMouseLeave={handlePopoverClose}
                    >
                      {item.name},
                    </Link>
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
                      onClose={handlePopoverClose}
                      disableRestoreFocus
                    >
                      <SpellCard id={item.url} />
                    </Popover>
                  </div>
                ))}
              </div>
              {props.monster.spell_casting.slots[2].map ((item, index) => (
                <Checkbox />
              ))}
            </ListItem>}
          
          {/* Level 4 */}
          {level4Spells.length !== 0 &&
            <ListItem dense={true}>
              <div style={{display: 'inline-flex'}}>
                <Typography variant="body1">Level 4:</Typography>
                {level4Spells.map ((item, index) => (
                  <div>
                    <span>&nbsp;</span>
                    <Link
                      className={classes.link}
                      aria-owns={open ? 'mouse-over-popover' : undefined}
                      aria-haspopup="true"
                      onClick={() => handleOpenNewSpellWindow (item.url)}
                      onMouseEnter={e => handlePopoverOpen (e, item.name)}
                      onMouseLeave={handlePopoverClose}
                    >
                      {item.name},
                    </Link>
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
                      onClose={handlePopoverClose}
                      disableRestoreFocus
                    >
                      <SpellCard id={item.url} />
                    </Popover>
                  </div>
                ))}
              </div>
              {props.monster.spell_casting.slots[3].map ((item, index) => (
                <Checkbox />
              ))}
            </ListItem>}
          
          {/* Level 5 */}
          {level5Spells.length !== 0 &&
            <ListItem dense={true}>
              <div style={{display: 'inline-flex'}}>
                <Typography variant="body1">Level 5:</Typography>
                {level5Spells.map ((item, index) => (
                  <div>
                    <span>&nbsp;</span>
                    <Link
                      className={classes.link}
                      aria-owns={open ? 'mouse-over-popover' : undefined}
                      aria-haspopup="true"
                      onClick={() => handleOpenNewSpellWindow (item.url)}
                      onMouseEnter={e => handlePopoverOpen (e, item.name)}
                      onMouseLeave={handlePopoverClose}
                    >
                      {item.name},
                    </Link>
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
                      onClose={handlePopoverClose}
                      disableRestoreFocus
                    >
                      <SpellCard id={item.url} />
                    </Popover>
                  </div>
                ))}
              </div>
              {props.monster.spell_casting.slots[4].map ((item, index) => (
                <Checkbox />
              ))}
            </ListItem>}
          
          {/* Level 6 */}
          {level6Spells.length !== 0 &&
            <ListItem dense={true}>
              <div style={{display: 'inline-flex'}}>
                <Typography variant="body1">Level 6:</Typography>
                {level6Spells.map ((item, index) => (
                  <div>
                    <span>&nbsp;</span>
                    <Link
                      className={classes.link}
                      aria-owns={open ? 'mouse-over-popover' : undefined}
                      aria-haspopup="true"
                      onClick={() => handleOpenNewSpellWindow (item.url)}
                      onMouseEnter={e => handlePopoverOpen (e, item.name)}
                      onMouseLeave={handlePopoverClose}
                    >
                      {item.name},
                    </Link>
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
                      onClose={handlePopoverClose}
                      disableRestoreFocus
                    >
                      <SpellCard id={item.url} />
                    </Popover>
                  </div>
                ))}
              </div>
              {props.monster.spell_casting.slots[5].map ((item, index) => (
                <Checkbox />
              ))}
            </ListItem>}
          
          {/* Level 7 */}
          {level7Spells.length !== 0 &&
            <ListItem dense={true}>
              <div style={{display: 'inline-flex'}}>
                <Typography variant="body1">Level 7:</Typography>
                {level7Spells.map ((item, index) => (
                  <div>
                    <span>&nbsp;</span>
                    <Link
                      className={classes.link}
                      aria-owns={open ? 'mouse-over-popover' : undefined}
                      aria-haspopup="true"
                      onClick={() => handleOpenNewSpellWindow (item.url)}
                      onMouseEnter={e => handlePopoverOpen (e, item.name)}
                      onMouseLeave={handlePopoverClose}
                    >
                      {item.name},
                    </Link>
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
                      onClose={handlePopoverClose}
                      disableRestoreFocus
                    >
                      <SpellCard id={item.url} />
                    </Popover>
                  </div>
                ))}
              </div>
              {props.monster.spell_casting.slots[6].map ((item, index) => (
                <Checkbox />
              ))}
            </ListItem>}
          
          {/* Level 8 */}
          {level8Spells.length !== 0 &&
            <ListItem dense={true}>
              <div style={{display: 'inline-flex'}}>
                <Typography variant="body1">Level 8:</Typography>
                {level8Spells.map ((item, index) => (
                  <div>
                    <span>&nbsp;</span>
                    <Link
                      className={classes.link}
                      aria-owns={open ? 'mouse-over-popover' : undefined}
                      aria-haspopup="true"
                      onClick={() => handleOpenNewSpellWindow (item.url)}
                      onMouseEnter={e => handlePopoverOpen (e, item.name)}
                      onMouseLeave={handlePopoverClose}
                    >
                      {item.name},
                    </Link>
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
                      onClose={handlePopoverClose}
                      disableRestoreFocus
                    >
                      <SpellCard id={item.url} />
                    </Popover>
                  </div>
                ))}
              </div>
              {props.monster.spell_casting.slots[7].map ((item, index) => (
                <Checkbox />
              ))}
            </ListItem>}
          
          {/* Level 9 */}
          {level9Spells.length !== 0 &&
            <ListItem dense={true}>
              <div style={{display: 'inline-flex'}}>
                <Typography variant="body1">Level 9:</Typography>
                {level9Spells.map ((item, index) => (
                  <div>
                    <span>&nbsp;</span>
                    <Link
                      className={classes.link}
                      aria-owns={open ? 'mouse-over-popover' : undefined}
                      aria-haspopup="true"
                      onClick={() => handleOpenNewSpellWindow (item.url)}
                      onMouseEnter={e => handlePopoverOpen (e, item.name)}
                      onMouseLeave={handlePopoverClose}
                    >
                      {item.name},
                    </Link>
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
                      onClose={handlePopoverClose}
                      disableRestoreFocus
                    >
                      <SpellCard id={item.url} />
                    </Popover>
                  </div>
                ))}
              </div>
              {props.monster.spell_casting.slots[8].map ((item, index) => (
                <Checkbox />
              ))}
            </ListItem>}
        
        </List>
        <Divider />

    </div>
  );
}
