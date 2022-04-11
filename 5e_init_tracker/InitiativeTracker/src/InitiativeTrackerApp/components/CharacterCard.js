import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import makeStyles from "@mui/styles/makeStyles";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import React, { useEffect } from "react";
import Chip from "@mui/material/Chip";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import IconButton from "@mui/material/IconButton";
import ConditionPicker from "./Modals/ConditionPicker";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CasinoIcon from "@mui/icons-material/Casino";
import Popover from "@mui/material/Popover";
import ConditionCard from "./ConditionInfo";
import PaletteIcon from "@mui/icons-material/Palette";
import ColorSelect from "../components/Modals/ColorSelect";
import CalculateDamage from "../components/Modals/CalculateDamage";
import Box from "@mui/material/Box";

const useStyles = makeStyles((theme) => ({
  cardwidth: {
    width: "inherit",
  },
  selected: {
    border: "10",
  },
  root: {
    flexGrow: 1,
  },
  char: {
    display: "flex",
    "align-items": "center",
  },
  charname: {
    padding: "1em",
    "font-size": "2em",
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
    width: theme.spacing(12),
    height: theme.spacing(12),
    "border-style": "solid",
    "border-color": "darkgrey",
    "border-width": ".25em",
  },
  paper_padding: {
    padding: "2em",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "15ch",
  },
  red_background: {
    background: "rgb(140,25,25)",
    background:
      "linear-gradient(90deg, rgba(140,25,25,1) 5%, rgba(48,43,42,1) 20%)",
  },
}));

export default function CharacterCard(props) {
  const classes = useStyles();
  const [openConditionPicker, setOpenConditionPicker] = React.useState(false);
  const [showFullDamage, setShowFullDamage] = React.useState(false);
  const [damage, setDamage] = React.useState("");
  const [initiative, setInitiative] = React.useState("");
  const [colorSelect, setColorSelect] = React.useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorE2, setAnchorE2] = React.useState(null);
  const [openedPopoverId, setOpenedPopoverId] = React.useState(null);
  const [borderVal, setBorderVal] = React.useState();

  useEffect(() => {
    setDamage(props.character.damage);
    setInitiative(props.character.initiative);
    if (props.character == props.selectedCharacter) {
      setBorderVal(1);
    } else {
      setBorderVal(0);
    }
  });

  const handleConditionPickerOpen = () => {
    setOpenConditionPicker(true);
  };

  const handleConditionPickerClose = () => {
    setOpenConditionPicker(false);
  };

  const handleOpenNewMonsterWindow = () => {
    props.setSelectedCharacter(props.character);
    setBorderVal(1);
  };

  const handleVisibilityFullDamage = () => {
    setShowFullDamage(!showFullDamage);
  };

  const handleDeleteCondition = (deleteStatus) => {
    let newList = [];
    Object.assign(newList, props.charList);
    newList.map((character) => {
      if (character.id === props.character.id) {
        character.statuses = character.statuses.filter(
          (status) => status.index !== deleteStatus
        );
      }
    });
    props.setInitiativeList(newList);
  };

  const handleDamageChange = (value) => {
    // if (e.target.value === '') {
    //   setDamage ('');
    //   props.character.damage = 0;
    // } else {
    //   setDamage (parseInt (e.target.value));
    //   props.character.damage = parseInt (e.target.value);
    // }

    if (value === "") {
      setDamage("");
      props.character.damage = 0;
      setDamage(0);
    } else {
      setDamage(props.character.damage + parseInt(value));
      props.character.damage = props.character.damage + parseInt(value);
    }
  };

  const handleInitiativeChange = (e) => {
    let regex = "[^0-9]";
    if (!e.target.value.match(regex)) {
      if (e.target.value === "") {
        setInitiative("");
        props.character.initiative = 0;
      } else {
        setInitiative(parseInt(e.target.value));
        let newList = [];
        Object.assign(newList, props.charList);
        newList.map((character) => {
          if (character.id === props.character.id) {
            character.initiative = parseInt(e.target.value);
          }
        });
      }
    }
  };

  const handleInitiativeRoll = () => {
    let mod = 0;
    let d20 = 0;
    if (props.character.initBonus !== undefined) {
      mod = props.character.initBonus;
    } else {
      mod = Math.floor((props.character.stats.dexterity - 10) / 2);
    }
    d20 = Math.floor(Math.random() * 20) + 1;
    setInitiative(d20 + mod);
    let newList = [];
    Object.assign(newList, props.charList);
    newList.map((character) => {
      if (character.id === props.character.id) {
        if (character.initiative === parseInt(d20 + mod)) {
          handleInitiativeRoll();
        }
        character.initiative = parseInt(d20 + mod);
      }
    });
    props.sortInitList(newList);
    props.setInitiativeList(newList);
    props.setSelectedCharacter(newList[0]);
  };

  const handleEnterKey = (e) => {
    if (e.keyCode == 13) {
      let newList = [];
      Object.assign(newList, props.charList);
      props.sortInitList(newList);
      props.setInitiativeList(newList);
      props.setSelectedCharacter(newList[0]);
    }
  };

  const handleBlur = (e) => {
    let newList = [];
    Object.assign(newList, props.charList);
    props.sortInitList(newList);
    props.setInitiativeList(newList);
    props.setSelectedCharacter(newList[0]);
  };

  const handlePopoverOpen = (event, popoverId) => {
    setOpenedPopoverId(popoverId);
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setOpenedPopoverId(null);
    setAnchorEl(null);
  };

  const getColor = (color) => {
    let newList = [];
    Object.assign(newList, props.charList);
    newList.map((character) => {
      if (character.id === props.character.id) {
        character.bg_color = color;
      }
    });
  };

  const handleColorSelectOpen = (e) => {
    setColorSelect(e.currentTarget);
  };

  const handleColorSelectClose = () => {
    setColorSelect(null);
  };

  const handleDamageClick = (event) => {
    setAnchorE2(event.currentTarget);
  };

  const handleDamageClose = () => {
    setAnchorE2(null);
  };

  const open = Boolean(anchorEl);
  const openDamage = Boolean(anchorE2);
  const idDamage = openDamage ? "simple-popover" : undefined;

  const openColorSelect = Boolean(colorSelect);
  const openColorSelectID = openColorSelect
    ? "color-simple-popover"
    : undefined;

  return (
    <Card
      className={classes.cardwidth}
      style={{ background: props.character.bg_color }}
    >
      <Box sx={{ border: borderVal }}>
        <CardContent>
          <div
            className={classes.align_center}
            onClick={handleOpenNewMonsterWindow}
          >
            <Grid container spacing={5}>
              <Grid className={classes.col} item xs>
                <PaletteIcon
                  onClick={handleColorSelectOpen}
                  aria-describedby={openColorSelectID}
                  variant="contained"
                  style={{
                    cursor: "pointer",
                    alignSelf: "flex-start",
                    display: "flex",
                  }}
                />
                <Popover
                  id={openColorSelectID}
                  open={openColorSelect}
                  anchorEl={colorSelect}
                  onClose={handleColorSelectClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}
                >
                  <ColorSelect
                    handleColorSelectClose={handleColorSelectClose}
                    getColor={getColor}
                  />
                </Popover>
                <Avatar
                  style={{ cursor: "pointer" }}
                  className={classes.char_portrait}
                  src={props.character.img}
                  onClick={handleOpenNewMonsterWindow}
                />
                <div className={classes.charname}>
                  <Typography variant="h6">{props.character.name}</Typography>
                  <Typography variant="subtitle1">
                    {props.character.type}:{" "}
                    {props.character.isPlayer ? "LVL " : "CR "}
                    {props.character.isPlayer === true && (
                      <span>{props.character.level}</span>
                    )}
                    {props.character.isPlayer === false && (
                      <span> {props.character.challenge_rating}</span>
                    )}
                  </Typography>
                  {props.character.spellSaveDC && (
                    <div>
                      <Typography variant="subtitle1">
                        Spell Save DC: {props.character.spellSaveDC}
                      </Typography>
                    </div>
                  )}
                </div>
              </Grid>

              <Grid className={classes.col} item xs>
                <div>
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="subtitle1">Status</Typography>
                    <IconButton
                      onClick={handleConditionPickerOpen}
                      aria-label="delete"
                      size="large"
                    >
                      <AddCircleOutlineIcon />
                    </IconButton>
                  </div>
                  <br />
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                    }}
                  >
                    <ConditionPicker
                      character={props.character}
                      onOpen={openConditionPicker}
                      onClose={handleConditionPickerClose}
                      setInitiativeList={props.setInitiativeList}
                      initList={props.charList}
                    />
                    {props.character.statuses.map((status) => (
                      <div>
                        <Chip
                          clickable
                          color="secondary"
                          label={status.name}
                          onClick={(e) => handlePopoverOpen(e, status.index)}
                          onDelete={() => handleDeleteCondition(status.index)}
                        />
                        <Popover
                          id={status.index}
                          className={classes.popover}
                          classes={{
                            paper: classes.paper,
                          }}
                          open={openedPopoverId === status.index}
                          anchorEl={anchorEl}
                          anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "left",
                          }}
                          transformOrigin={{
                            vertical: "bottom",
                            horizontal: "left",
                          }}
                          onClose={handlePopoverClose}
                          disableRestoreFocus
                        >
                          <ConditionCard id={status.index} />
                        </Popover>
                      </div>
                    ))}
                  </div>
                </div>
              </Grid>

              <Grid className={classes.col} item xs>
                <div>
                  <Typography variant="subtitle1">AC</Typography>

                  <Typography variant="h5">
                    {props.character.armor_class}
                  </Typography>
                </div>
              </Grid>

              <Grid className={classes.col} item xs>
                <div>
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      style={{ paddingRight: "12px" }}
                      variant="subtitle1"
                    >
                      Damage
                    </Typography>

                    <Popover
                      id={idDamage}
                      open={openDamage}
                      anchorEl={anchorE2}
                      onClose={handleDamageClose}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "center",
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "center",
                      }}
                    >
                      <CalculateDamage
                        handleDamageClose={handleDamageClose}
                        handleDamageChange={handleDamageChange}
                      />
                    </Popover>

                    <IconButton
                      style={{ padding: "0px" }}
                      onClick={handleVisibilityFullDamage}
                      aria-label="delete"
                      size="large"
                    >
                      <VisibilityIcon />
                    </IconButton>
                  </div>
                  <br />
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      flexWrap: "wrap",
                    }}
                  >
                    {showFullDamage === false && (
                      <Typography
                        Typography
                        variant="h5"
                        onClick={handleDamageClick}
                        aria-describedby={idDamage}
                        style={{ cursor: "pointer" }}
                      >
                        {damage}
                      </Typography>
                    )}
                    {showFullDamage === true && (
                      <Typography
                        variant="h4"
                        onClick={handleDamageClick}
                        aria-describedby={idDamage}
                        style={{ cursor: "pointer" }}
                      >
                        {props.character.hit_points - damage}/
                        {props.character.hit_points}
                      </Typography>
                    )}
                  </div>
                </div>
              </Grid>

              <Grid className={classes.col} item xs>
                <div>
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      style={{ paddingRight: "12px" }}
                      variant="subtitle1"
                    >
                      Initiative
                    </Typography>
                    <IconButton
                      style={{ padding: "0px" }}
                      onClick={handleInitiativeRoll}
                      aria-label="delete"
                      size="large"
                    >
                      <CasinoIcon />
                    </IconButton>
                  </div>
                  <br />
                  <div>
                    <TextField
                      className={classes.textField}
                      size="small"
                      onChange={handleInitiativeChange}
                      onKeyDown={handleEnterKey}
                      onBlur={handleBlur}
                      value={initiative}
                      id="outlined-basic"
                      variant="outlined"
                    />
                  </div>
                </div>
              </Grid>
            </Grid>
          </div>
          <div />
        </CardContent>
      </Box>
    </Card>
  );
}
