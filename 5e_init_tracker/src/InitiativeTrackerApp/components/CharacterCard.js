import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import React, { useEffect } from "react";
import Chip from "@material-ui/core/Chip";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import IconButton from "@material-ui/core/IconButton";
import ConditionPicker from "./Modals/ConditionPicker";
import VisibilityIcon from "@material-ui/icons/Visibility";

const useStyles = makeStyles((theme) => ({
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
}));

export default function CharacterCard(props) {
  const classes = useStyles();
  const { ipcRenderer } = window.require("electron");
  const [openConditionPicker, setOpenConditionPicker] = React.useState(false);
  const [showFullDamage, setShowFullDamage] = React.useState(false);
  const [damage, setDamage] = React.useState("");
  const [initiative, setInitiative] = React.useState("");

  useEffect(() => {
    setDamage(props.character.damage);
    setInitiative(props.character.initiative);
  }, props.charList);

  const handleConditionPickerOpen = () => {
    setOpenConditionPicker(true);
  };

  const handleConditionPickerClose = () => {
    setOpenConditionPicker(false);
  };

  const handleOpenNewMonsterWindow = () => {
    if (props.character.isPlayer === false) {
      ipcRenderer.send("new-window", "monster", props.character.name);
    }
  };

  const handleOpenNewConditionWindow = (status) => {
    ipcRenderer.send("new-window", "condition", status);
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

  const handleDamageChange = (e) => {
    if (e.target.value === "") {
      setDamage("");
      props.character.damage = 0;
    } else {
      setDamage(parseInt(e.target.value));
      props.character.damage = parseInt(e.target.value);
    }
  };

  const handleInitiativeChange = (e) => {
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
  };

  const handleEnterKey = (e) => {
    if (e.keyCode == 13) {
      let newList = [];
      Object.assign(newList, props.charList);
      props.sortInitList(newList);
      props.setInitiativeList(newList);
    }
  };

  const handleBlur = (e) => {
    let newList = [];
    Object.assign(newList, props.charList);
    props.sortInitList(newList);
    props.setInitiativeList(newList);
  };

  return (
    <Card className={classes.cardwidth}>
      <CardContent>
        <div className={classes.align_center}>
          <Grid container spacing={5}>
            <Grid className={classes.col} item xs>
              <Avatar
                style={{ cursor: "pointer" }}
                className={classes.char_portrait}
                src={props.character.img}
                onClick={handleOpenNewMonsterWindow}
              />
              <div className={classes.charname}>
                <Typography variant="h6" gutterBottom>
                  {props.character.name}
                </Typography>
                <Typography variant="subtitle2" gutterBottom>
                  {props.character.type}:{" "}
                  {props.character.isPlayer ? "LVL " : "CR "}
                  {props.character.isPlayer === true && (
                    <span>{props.character.level}</span>
                  )}
                  {props.character.isPlayer === false && (
                    <span> {props.character.challenge_rating}</span>
                  )}
                </Typography>
              </div>
            </Grid>

            <Grid className={classes.col} item xs>
              <div>
                <Typography variant="subtitle2" gutterBottom>
                  Status
                </Typography>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    flexWrap: "wrap",
                  }}
                >
                  <IconButton
                    onClick={handleConditionPickerOpen}
                    aria-label="delete"
                  >
                    <AddCircleOutlineIcon />
                  </IconButton>
                  <ConditionPicker
                    character={props.character}
                    onOpen={openConditionPicker}
                    onClose={handleConditionPickerClose}
                    setInitiativeList={props.setInitiativeList}
                    initList={props.charList}
                  ></ConditionPicker>
                  {props.character.statuses.map((status) => (
                    <Chip
                      onClick={() => handleOpenNewConditionWindow(status.index)}
                      clickable
                      color="secondary"
                      label={status.name}
                      onDelete={() => handleDeleteCondition(status.index)}
                    />
                  ))}
                </div>
              </div>
            </Grid>

            <Grid className={classes.col} item xs>
              <div>
                <Typography variant="subtitle2" gutterBottom>
                  AC
                </Typography>
                <Typography variant="h4" gutterBottom>
                  {props.character.armor_class}
                </Typography>
              </div>
            </Grid>

            <Grid className={classes.col} item xs>
              <div>
                <Typography variant="subtitle2" gutterBottom>
                  Damage
                </Typography>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    flexWrap: "wrap",
                  }}
                >
                  <IconButton
                    onClick={handleVisibilityFullDamage}
                    aria-label="delete"
                  >
                    <VisibilityIcon />
                  </IconButton>
                  {showFullDamage === false && (
                    <TextField
                      className={classes.textField}
                      size="small"
                      onChange={handleDamageChange}
                      value={damage}
                      id="outlined-basic"
                      variant="outlined"
                    />
                  )}
                  {showFullDamage === true && (
                    <Typography variant="h4">
                      {damage}/{props.character.hit_points}
                    </Typography>
                  )}
                </div>
              </div>
            </Grid>

            <Grid className={classes.col} item xs>
              <div>
                <Typography variant="subtitle2" gutterBottom>
                  Initiative
                </Typography>
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
            </Grid>
          </Grid>
        </div>
      </CardContent>
    </Card>
  );
}
