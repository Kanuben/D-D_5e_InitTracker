import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
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
  let strMod = 0;
  let dexMod = 0;
  let conMod = 0;
  let intMod = 0;
  let wisMod = 0;
  let chaMod = 0;
  let cr = 0;

  let savingThrows = [];
  let skills = [];
  let damageImmunities = [];
  let damageResistances = [];
  let damageVulnerabilties = [];
  let condidtionImmunities = [];
  let senses = [];
  let languages = [];
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
    strMod = Math.floor((monster.stats.strength - 10) / 2);
    dexMod = Math.floor((monster.stats.dexterity - 10) / 2);
    conMod = Math.floor((monster.stats.constitution - 10) / 2);
    intMod = Math.floor((monster.stats.intelligence - 10) / 2);
    wisMod = Math.floor((monster.stats.wisdom - 10) / 2);
    chaMod = Math.floor((monster.stats.charisma - 10) / 2);

    savingThrows.push(
      { name: "STR", value: strMod },
      { name: "DEX", value: dexMod },
      { name: "CON", value: conMod },
      { name: "INT", value: intMod },
      { name: "WIS", value: wisMod },
      { name: "CHA", value: chaMod }
    );
    monster.proficiencies.forEach((element) => {
      if (element.name.includes("Saving Throw:")) {
        element.name = element.name.replace("Saving Throw: ", "");
        let index = savingThrows.findIndex(
          (item) => item.name === element.name
        );
        savingThrows[index].value = element.value;
      }
      if (element.name.includes("Skill:")) {
        skills.push({
          name: (element.name = element.name.replace("Skill:", "")),
          value: element.value,
        });
      }
    });
    if (monster.damage_vulnerabilities !== undefined) {
      monster.damage_vulnerabilities.forEach((item) => {
        damageVulnerabilties.push(item);
      });
    }
    if (monster.damage_resistances !== undefined) {
      monster.damage_resistances.forEach((item) => {
        damageResistances.push(item);
      });
    }
    if (monster.damage_immunities !== undefined) {
      monster.damage_immunities.forEach((item) => {
        damageImmunities.push(item);
      });
    }
    if (monster.condition_immunities !== undefined) {
      monster.condition_immunities.forEach((item) => {
        condidtionImmunities.push(item.name);
      });
    }
    if (monster.spell_casting !== undefined) {
      spells = monster.spell_casting.spells;
      spellSlots = monster.spell_casting.slots;
    }
    if (monster.special_abilities !== undefined) {
      monster.special_abilities.forEach((item) => {
        specialAbilities.push(item);
      });
    }

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

    senses = monster.senses;
    languages = monster.languages;
    cr = monster.challenge_rating;
  }

  const getSpeed = () => {
    let speed = "";
    if (monster.speed.walk !== undefined)
      speed = speed.concat(monster.speed.walk);
    if (monster.speed.climb !== undefined)
      speed = speed.concat(" climb " + monster.speed.climb);
    if (monster.speed.swim !== undefined)
      speed = speed.concat(" swim " + monster.speed.swim);
    if (monster.speed.fly !== undefined)
      speed = speed.concat(" fly " + monster.speed.fly);
    return speed;
  };

  const isSubtype = () => {
    let subtype = "";
    if (monster.subtype !== null)
      subtype = subtype.concat("(" + monster.subtype + ")");

    return subtype;
  };

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
          <AppBar position="fixed">
            <Toolbar>
              <Typography variant="h4" gutterBottom>
                {monster.name}
              </Typography>
              <Typography variant="subtitle2" gutterBottom>
                &nbsp;({monster.size} {monster.type}
                {isSubtype()}, {monster.alignment})
              </Typography>
            </Toolbar>
          </AppBar>
          <Toolbar />
          <CardContent>
            <div>Armor Class {monster.armor_class}</div>
            <div>
              Hit Points {monster.hit_points} ({monster.hit_dice}+
              {parseInt(monster.hit_dice) * conMod})
            </div>
            <div>
              Speed {getSpeed()}
              <div
                style={{
                  display: "flex",
                  "flex-direction": "row-reverse",
                  color: "red",
                }}
              >
                <Typography variant="caption">*saving throws</Typography>
              </div>
            </div>
            <Divider />

            <div>
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="flex-start"
                container
                spacing={1}
              >
                <Grid item xs={2}>
                  STR
                </Grid>
                <Grid item xs={2}>
                  DEX
                </Grid>
                <Grid item xs={2}>
                  CON
                </Grid>
                <Grid item xs={2}>
                  INT
                </Grid>
                <Grid item xs={2}>
                  WIS
                </Grid>
                <Grid item xs={2}>
                  CHA
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
                <Grid item xs={2}>
                  {monster.stats.strength} ({strMod})
                </Grid>
                <Grid item xs={2}>
                  {monster.stats.dexterity} ({dexMod})
                </Grid>
                <Grid item xs={2}>
                  {monster.stats.constitution} ({conMod})
                </Grid>
                <Grid item xs={2}>
                  {monster.stats.intelligence} ({intMod})
                </Grid>
                <Grid item xs={2}>
                  {monster.stats.wisdom} ({wisMod})
                </Grid>
                <Grid item xs={2}>
                  {monster.stats.charisma} ({chaMod})
                </Grid>
              </Grid>

              {savingThrows.length !== 0 && (
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="flex-start"
                  container
                  spacing={1}
                >
                  {savingThrows.map((savingThrow, index) => (
                    <Grid item xs={2}>
                      <Typography style={{ color: "red" }}>
                        {savingThrow.value}
                      </Typography>
                    </Grid>
                  ))}
                </Grid>
              )}
            </div>
            <Divider />

            {skills.length !== 0 && (
              <Typography variant="subtitle2">Skills</Typography>
            )}
            {skills.map((prof, index) => (
              <ListItem dense={true}>
                <Typography variant="caption">
                  {prof.name} +{prof.value}
                </Typography>
              </ListItem>
            ))}

            {damageVulnerabilties.length !== 0 && (
              <Typography variant="subtitle2">Damage Vulnerabilties</Typography>
            )}
            {damageVulnerabilties.map((vulnerabilties, index) => (
              <ListItem dense={true}>
                <Typography variant="caption">{vulnerabilties}</Typography>
              </ListItem>
            ))}

            {damageResistances.length !== 0 && (
              <Typography variant="subtitle2">Damage Resistance</Typography>
            )}
            {damageResistances.map((resistance, index) => (
              <ListItem dense={true}>
                <Typography variant="caption">{resistance}</Typography>
              </ListItem>
            ))}

            {damageImmunities.length !== 0 && (
              <Typography variant="subtitle2">Damage Immunities</Typography>
            )}
            {damageImmunities.map((immunities, index) => (
              <ListItem dense={true}>
                <Typography variant="caption">{immunities}</Typography>
              </ListItem>
            ))}

            {condidtionImmunities.length !== 0 && (
              <Typography variant="subtitle2">Condition Immunities</Typography>
            )}
            {condidtionImmunities.map((immunities, index) => (
              <ListItem dense={true}>
                <Typography variant="caption">{immunities}</Typography>
              </ListItem>
            ))}
            {senses.length !== 0 && (
              <div style={{ display: "flex" }}>
                <Typography variant="subtitle2">Senses</Typography>
                {senses.map((sense) => (
                  <Typography style={{ marginLeft: "10px" }} variant="caption">
                    {sense.name}&nbsp;{sense.value},
                  </Typography>
                ))}
              </div>
            )}
            {languages.length !== 0 && (
              <div style={{ display: "flex" }}>
                <Typography variant="subtitle2">Languages</Typography>
                {languages.map((language) => (
                  <Typography style={{ marginLeft: "10px" }} variant="caption">
                    {language},
                  </Typography>
                ))}
              </div>
            )}

            <div style={{ display: "flex" }}>
              <Typography variant="subtitle2">
                Challenge Raiting
                <Typography style={{ marginLeft: "10px" }} variant="caption">
                  {cr}
                </Typography>
              </Typography>
            </div>
            <Divider />

            {specialAbilities.length !== 0 && (
              <Typography variant="h6">Special Abilities</Typography>
            )}
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
                          aria-owns={open ? "mouse-over-popover" : undefined}
                          aria-haspopup="true"
                          onClick={() => handleOpenNewSpellWindow(item.url)}
                          onMouseEnter={(e) => handlePopoverOpen(e, item.name)}
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
                          aria-owns={open ? "mouse-over-popover" : undefined}
                          aria-haspopup="true"
                          onClick={() => handleOpenNewSpellWindow(item.url)}
                          onMouseEnter={(e) => handlePopoverOpen(e, item.name)}
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
                          aria-owns={open ? "mouse-over-popover" : undefined}
                          aria-haspopup="true"
                          onClick={() => handleOpenNewSpellWindow(item.url)}
                          onMouseEnter={(e) => handlePopoverOpen(e, item.name)}
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
                          aria-owns={open ? "mouse-over-popover" : undefined}
                          aria-haspopup="true"
                          onClick={() => handleOpenNewSpellWindow(item.url)}
                          onMouseEnter={(e) => handlePopoverOpen(e, item.name)}
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
                          aria-owns={open ? "mouse-over-popover" : undefined}
                          aria-haspopup="true"
                          onClick={() => handleOpenNewSpellWindow(item.url)}
                          onMouseEnter={(e) => handlePopoverOpen(e, item.name)}
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
                          aria-owns={open ? "mouse-over-popover" : undefined}
                          aria-haspopup="true"
                          onClick={() => handleOpenNewSpellWindow(item.url)}
                          onMouseEnter={(e) => handlePopoverOpen(e, item.name)}
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
                          aria-owns={open ? "mouse-over-popover" : undefined}
                          aria-haspopup="true"
                          onClick={() => handleOpenNewSpellWindow(item.url)}
                          onMouseEnter={(e) => handlePopoverOpen(e, item.name)}
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
                          aria-owns={open ? "mouse-over-popover" : undefined}
                          aria-haspopup="true"
                          onClick={() => handleOpenNewSpellWindow(item.url)}
                          onMouseEnter={(e) => handlePopoverOpen(e, item.name)}
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
                          aria-owns={open ? "mouse-over-popover" : undefined}
                          aria-haspopup="true"
                          onClick={() => handleOpenNewSpellWindow(item.url)}
                          onMouseEnter={(e) => handlePopoverOpen(e, item.name)}
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
                          aria-owns={open ? "mouse-over-popover" : undefined}
                          aria-haspopup="true"
                          onClick={() => handleOpenNewSpellWindow(item.url)}
                          onMouseEnter={(e) => handlePopoverOpen(e, item.name)}
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

            {actions.length !== 0 && (
              <Typography variant="h6">Actions</Typography>
            )}
            {actions.map((item, index) => (
              <ListItem dense={true}>
                <Typography variant="subtitle2">
                  {item.name}:
                  <Typography variant="caption"> {item.desc} </Typography>
                </Typography>
              </ListItem>
            ))}

            <Divider />

            {legendaryActions.length !== 0 && (
              <Typography variant="h6">Legendary Actions</Typography>
            )}
            {legendaryActionsSlots.map((item, index) => (
              <Checkbox />
            ))}
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
