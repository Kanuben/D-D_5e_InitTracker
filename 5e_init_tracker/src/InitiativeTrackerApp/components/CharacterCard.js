import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import React from "react";
import Chip from "@material-ui/core/Chip";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import IconButton from "@material-ui/core/IconButton";
import ConditionPicker from "./Modals/ConditionPicker";

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
}));

export default function CharacterCard(props) {
  const classes = useStyles();
  const { ipcRenderer } = window.require("electron");
  const [openConditionPicker, setOpenConditionPicker] = React.useState(false);

  const handleConditionPickerOpen = () => {
    setOpenConditionPicker(true);
  };

  const handleConditionPickerClose = () => {
    setOpenConditionPicker(false);
  };

  const handleOpenNewMonsterWindow = () => {
    if (props.character.isPlayer === false) {
      ipcRenderer.send("new-window", "monster", props.character.index);
    }
  };

  const handleOpenNewConditionWindow = (status) => {
    ipcRenderer.send("new-window", "condition", status);
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
                <div style={{display: 'inline-flex',alignItems: 'center',flexWrap: 'wrap'}}>
                <IconButton
                  onClick={handleConditionPickerOpen}
                  aria-label="delete"
                >
                  <AddCircleOutlineIcon />
                </IconButton>
                <ConditionPicker
                  character = {props.character}
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
                <Typography variant="h4" gutterBottom>
                  0/{props.character.hit_points}
                </Typography>
              </div>
            </Grid>

            <Grid className={classes.col} item xs>
              <div>
                {/* <Typography variant="subtitle2" gutterBottom>
                  Initiative
                </Typography> */}
                <TextField
                  value={props.character.initiative}
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
