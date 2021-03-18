import AppBar from "@material-ui/core/AppBar";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Checkbox from "@material-ui/core/Checkbox";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Popover from "@material-ui/core/Popover";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { readMonsterFile } from "../utilities/MonsterTranslator";
import SpellCard from "./SpellInfo";
import MainStats from '../components/MonsterInfo/MainStats';

const useStyles = makeStyles((theme) => ({
  popover: {
    pointerEvents: "none",
  },
  link: {
    color: theme.palette.secondary.main,
  },
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

export default function MonsterInfo(props) {
  let specialAbilities = [];

  let spellSlots = [];
  let spells = [];
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

  let actions = [];
  let legendaryActions = [];
  let legendaryActionsSlots = [];

  const theme = useTheme();
  const classes = useStyles(theme);
  const [monster, setMonster] = React.useState();
  const { ipcRenderer } = window.require("electron");

  useEffect(() => {
    let monsterList = readMonsterFile();
    setMonster(...monsterList.filter((e) => e.name === props.match.params.id));
  }, props);

  if (monster) {
    if (spells) {
      spells.forEach((spell) => {
        if (spell.url) {
          spell.url = spell.url.substring(spell.url.lastIndexOf("/") + 1);
        }
        switch (spell.level) {
          case 0:
            cantrips.push(spell);
            break;
          case 1:
            level1Spells.push(spell);
            break;
          case 2:
            level2Spells.push(spell);
            break;
          case 3:
            level3Spells.push(spell);
            break;
          case 4:
            level4Spells.push(spell);
            break;
          case 5:
            level5Spells.push(spell);
            break;
          case 6:
            level6Spells.push(spell);
            break;
          case 7:
            level7Spells.push(spell);
            break;
          case 8:
            level8Spells.push(spell);
            break;
          case 9:
            level9Spells.push(spell);
            break;
        }
      });
    }

    if (monster.actions !== undefined) {
      monster.actions.forEach((item) => {
        actions.push(item);
      });
    }
    if (monster.legendary_actions.actions !== undefined) {
      monster.legendary_actions.actions.forEach((item) => {
        legendaryActions.push(item);
      });
    }

    if (monster.legendary_actions.actions_per_turn !== undefined) {
      monster.legendary_actions.actions_per_turn.forEach((item) => {
        legendaryActionsSlots.push(item);
      });
    }


  }


  const handleOpenNewSpellWindow = (spellUrl) => {
    ipcRenderer.send("new-window", "spell", spellUrl);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openedPopoverId, setOpenedPopoverId] = React.useState(null);

  const handlePopoverOpen = (event, popoverId) => {
    setOpenedPopoverId(popoverId);
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setOpenedPopoverId(null);
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <Card className={classes.cardwidth}>
      {monster && (
        <div>
          <MainStats
          monster={monster}
          />
          <CardContent>

            {specialAbilities.length !== 0 && (
              <div>
                <Typography variant="h6">Special Abilities</Typography>

                <List>
                  {specialAbilities.map((item, index) => (
                    <ListItem dense={true}>
                      <Typography variant="subtitle2">
                        {item.name}:
                        <Typography variant="caption"> {item.desc} </Typography>
                      </Typography>
                    </ListItem>
                  ))}

                  {cantrips.length !== 0 && (
                    <ListItem>
                      <div style={{ display: "inline-flex" }}>
                        <Typography variant="body1">Cantrips:</Typography>
                        {cantrips.map((item, index) => (
                          <div>
                            <span>&nbsp;</span>
                            <Link
                              className={classes.link}
                              aria-owns={
                                open ? "mouse-over-popover" : undefined
                              }
                              aria-haspopup="true"
                              onClick={() => handleOpenNewSpellWindow(item.url)}
                              onMouseEnter={(e) =>
                                handlePopoverOpen(e, item.name)
                              }
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
                                vertical: "top",
                                horizontal: "left",
                              }}
                              transformOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                              }}
                              onClose={handlePopoverClose}
                              disableRestoreFocus
                            >
                              <SpellCard id={item.url}></SpellCard>
                            </Popover>
                          </div>
                        ))}
                      </div>
                    </ListItem>
                  )}

                  {level1Spells.length !== 0 && (
                    <ListItem>
                      <div style={{ display: "inline-flex" }}>
                        <Typography variant="body1">Level 1:</Typography>
                        {level1Spells.map((item) => (
                          <div>
                            <span>&nbsp;</span>
                            <Link
                              className={classes.link}
                              aria-owns={
                                open ? "mouse-over-popover" : undefined
                              }
                              aria-haspopup="true"
                              onClick={() => handleOpenNewSpellWindow(item.url)}
                              onMouseEnter={(e) =>
                                handlePopoverOpen(e, item.name)
                              }
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
                                vertical: "bottom",
                                horizontal: "left",
                              }}
                              transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                              }}
                              onClose={handlePopoverClose}
                              disableRestoreFocus
                            >
                              <SpellCard id={item.url}></SpellCard>
                            </Popover>
                          </div>
                        ))}
                      </div>

                      {spellSlots[0].map((item, index) => (
                        <Checkbox />
                      ))}
                    </ListItem>
                  )}

                  {level2Spells.length !== 0 && (
                    <ListItem>
                      <div style={{ display: "inline-flex" }}>
                        <Typography variant="body1">Level 2:</Typography>
                        {level2Spells.map((item, index) => (
                          <div>
                            <span>&nbsp;</span>
                            <Link
                              className={classes.link}
                              aria-owns={
                                open ? "mouse-over-popover" : undefined
                              }
                              aria-haspopup="true"
                              onClick={() => handleOpenNewSpellWindow(item.url)}
                              onMouseEnter={(e) =>
                                handlePopoverOpen(e, item.name)
                              }
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
                                vertical: "bottom",
                                horizontal: "left",
                              }}
                              transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                              }}
                              onClose={handlePopoverClose}
                              disableRestoreFocus
                            >
                              <SpellCard id={item.url}></SpellCard>
                            </Popover>
                          </div>
                        ))}
                      </div>
                      {spellSlots[1].map((item, index) => (
                        <Checkbox />
                      ))}
                    </ListItem>
                  )}
                  {level3Spells.length !== 0 && (
                    <ListItem>
                      <div style={{ display: "inline-flex" }}>
                        <Typography variant="body1">Level 3:</Typography>
                        {level3Spells.map((item, index) => (
                          <div>
                            <span>&nbsp;</span>
                            <Link
                              className={classes.link}
                              aria-owns={
                                open ? "mouse-over-popover" : undefined
                              }
                              aria-haspopup="true"
                              onClick={() => handleOpenNewSpellWindow(item.url)}
                              onMouseEnter={(e) =>
                                handlePopoverOpen(e, item.name)
                              }
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
                                vertical: "bottom",
                                horizontal: "left",
                              }}
                              transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                              }}
                              onClose={handlePopoverClose}
                              disableRestoreFocus
                            >
                              <SpellCard id={item.url}></SpellCard>
                            </Popover>
                          </div>
                        ))}
                      </div>
                      {spellSlots[2].map((item, index) => (
                        <Checkbox />
                      ))}
                    </ListItem>
                  )}
                  {level4Spells.length !== 0 && (
                    <ListItem>
                      <div style={{ display: "inline-flex" }}>
                        <Typography variant="body1">Level 4:</Typography>
                        {level4Spells.map((item, index) => (
                          <div>
                            <span>&nbsp;</span>
                            <Link
                              className={classes.link}
                              aria-owns={
                                open ? "mouse-over-popover" : undefined
                              }
                              aria-haspopup="true"
                              onClick={() => handleOpenNewSpellWindow(item.url)}
                              onMouseEnter={(e) =>
                                handlePopoverOpen(e, item.name)
                              }
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
                                vertical: "bottom",
                                horizontal: "left",
                              }}
                              transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                              }}
                              onClose={handlePopoverClose}
                              disableRestoreFocus
                            >
                              <SpellCard id={item.url}></SpellCard>
                            </Popover>
                          </div>
                        ))}
                      </div>
                      {spellSlots[3].map((item, index) => (
                        <Checkbox />
                      ))}
                    </ListItem>
                  )}
                  {level5Spells.length !== 0 && (
                    <ListItem>
                      <div style={{ display: "inline-flex" }}>
                        <Typography variant="body1">Level 5:</Typography>
                        {level5Spells.map((item, index) => (
                          <div>
                            <span>&nbsp;</span>
                            <Link
                              className={classes.link}
                              aria-owns={
                                open ? "mouse-over-popover" : undefined
                              }
                              aria-haspopup="true"
                              onClick={() => handleOpenNewSpellWindow(item.url)}
                              onMouseEnter={(e) =>
                                handlePopoverOpen(e, item.name)
                              }
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
                                vertical: "bottom",
                                horizontal: "left",
                              }}
                              transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                              }}
                              onClose={handlePopoverClose}
                              disableRestoreFocus
                            >
                              <SpellCard id={item.url}></SpellCard>
                            </Popover>
                          </div>
                        ))}
                      </div>
                      {spellSlots[4].map((item, index) => (
                        <Checkbox />
                      ))}
                    </ListItem>
                  )}
                  {level6Spells.length !== 0 && (
                    <ListItem>
                      <div style={{ display: "inline-flex" }}>
                        <Typography variant="body1">Level 6:</Typography>
                        {level6Spells.map((item, index) => (
                          <div>
                            <span>&nbsp;</span>
                            <Link
                              className={classes.link}
                              aria-owns={
                                open ? "mouse-over-popover" : undefined
                              }
                              aria-haspopup="true"
                              onClick={() => handleOpenNewSpellWindow(item.url)}
                              onMouseEnter={(e) =>
                                handlePopoverOpen(e, item.name)
                              }
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
                                vertical: "bottom",
                                horizontal: "left",
                              }}
                              transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                              }}
                              onClose={handlePopoverClose}
                              disableRestoreFocus
                            >
                              <SpellCard id={item.url}></SpellCard>
                            </Popover>
                          </div>
                        ))}
                      </div>
                      {spellSlots[5].map((item, index) => (
                        <Checkbox />
                      ))}
                    </ListItem>
                  )}
                  {level7Spells.length !== 0 && (
                    <ListItem>
                      <div style={{ display: "inline-flex" }}>
                        <Typography variant="body1">Level 7:</Typography>
                        {level7Spells.map((item, index) => (
                          <div>
                            <span>&nbsp;</span>
                            <Link
                              className={classes.link}
                              aria-owns={
                                open ? "mouse-over-popover" : undefined
                              }
                              aria-haspopup="true"
                              onClick={() => handleOpenNewSpellWindow(item.url)}
                              onMouseEnter={(e) =>
                                handlePopoverOpen(e, item.name)
                              }
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
                                vertical: "bottom",
                                horizontal: "left",
                              }}
                              transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                              }}
                              onClose={handlePopoverClose}
                              disableRestoreFocus
                            >
                              <SpellCard id={item.url}></SpellCard>
                            </Popover>
                          </div>
                        ))}
                      </div>
                      {spellSlots[6].map((item, index) => (
                        <Checkbox />
                      ))}
                    </ListItem>
                  )}
                  {level8Spells.length !== 0 && (
                    <ListItem>
                      <div style={{ display: "inline-flex" }}>
                        <Typography variant="body1">Level 8:</Typography>
                        {level8Spells.map((item, index) => (
                          <div>
                            <span>&nbsp;</span>
                            <Link
                              className={classes.link}
                              aria-owns={
                                open ? "mouse-over-popover" : undefined
                              }
                              aria-haspopup="true"
                              onClick={() => handleOpenNewSpellWindow(item.url)}
                              onMouseEnter={(e) =>
                                handlePopoverOpen(e, item.name)
                              }
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
                                vertical: "bottom",
                                horizontal: "left",
                              }}
                              transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                              }}
                              onClose={handlePopoverClose}
                              disableRestoreFocus
                            >
                              <SpellCard id={item.url}></SpellCard>
                            </Popover>
                          </div>
                        ))}
                      </div>
                      {spellSlots[7].map((item, index) => (
                        <Checkbox />
                      ))}
                    </ListItem>
                  )}
                  {level9Spells.length !== 0 && (
                    <ListItem>
                      <div style={{ display: "inline-flex" }}>
                        <Typography variant="body1">Level 9:</Typography>
                        {level9Spells.map((item, index) => (
                          <div>
                            <span>&nbsp;</span>
                            <Link
                              className={classes.link}
                              aria-owns={
                                open ? "mouse-over-popover" : undefined
                              }
                              aria-haspopup="true"
                              onClick={() => handleOpenNewSpellWindow(item.url)}
                              onMouseEnter={(e) =>
                                handlePopoverOpen(e, item.name)
                              }
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
                                vertical: "bottom",
                                horizontal: "left",
                              }}
                              transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                              }}
                              onClose={handlePopoverClose}
                              disableRestoreFocus
                            >
                              <SpellCard id={item.url}></SpellCard>
                            </Popover>
                          </div>
                        ))}
                      </div>
                      {spellSlots[8].map((item, index) => (
                        <Checkbox />
                      ))}
                    </ListItem>
                  )}
                </List>
                <Divider />
              </div>
            )}

            {actions.length !== 0 && (
              <div>
                <Typography variant="h6">Actions</Typography>
                {actions.map((item, index) => (
                  <ListItem dense={true}>
                    <Typography variant="subtitle2">
                      {item.name}:
                      <Typography variant="caption"> {item.desc} </Typography>
                    </Typography>
                  </ListItem>
                ))}
                <Divider />
              </div>
            )}

            {legendaryActions.length !== 0 && (
              <div>
                <Typography variant="h6">Legendary Actions</Typography>
                {legendaryActionsSlots.map((item, index) => (
                  <Checkbox />
                ))}
              </div>
            )}

            {legendaryActions.map((item, index) => (
              <ListItem dense={true}>
                <Typography variant="subtitle2">
                  {item.name}:
                  <Typography variant="caption"> {item.desc} </Typography>
                </Typography>
              </ListItem>
            ))}
          </CardContent>
        </div>
      )}
    </Card>
  );
}
