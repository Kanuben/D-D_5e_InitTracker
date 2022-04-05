import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CloseIcon from "@mui/icons-material/Close";
import { Grid } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Dialog from "@mui/material/Dialog";
import MuiDialogActions from "@mui/material/DialogActions";
import MuiDialogContent from "@mui/material/DialogContent";
import MuiDialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Skeleton from "@mui/material/Skeleton";
import { styled, useTheme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import makeStyles from "@mui/styles/makeStyles";
import withStyles from "@mui/styles/withStyles";
import React, { useEffect } from "react";
import { Character } from "../../../templates/character";
import { isElectron } from "../../../utilities/ElectronHelper";
import Avatar from "@mui/material/Avatar";
import LoadingButton from "@mui/lab/LoadingButton";
import Stack from "@mui/material/Stack";
import { ReactComponent as Demo } from "../../../assets/demo.svg";
import { forEach, set } from "lodash";
import SvgIcon from "@mui/material/SvgIcon";

let fs;
let path;

if (isElectron()) {
  fs = window.require("fs");
  path = window.require("path");
  const app = window.require("electron");
} else {
}
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  flex: {
    display: "flex",
    justifyContent: "space-between",
  },
  placeholder: {
    display: "flex",
    "justify-content": "center",
    "align-items": "center",
    "flex-direction": "column",
  },
  dialogSize: {},
  textField: {
    width: "100%",
  },
  padBot: {
    "padding-bottom": "1em",
  },
  centerImg: {
    "margin-left": "auto",
    "margin-right": " auto",
    width: "30%",
    display: "block",
    "border-radius": "10%",
  },
}));

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
          size="large"
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function EditChar(props) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("lg"));
  const [maxWidth, setMaxWidth] = React.useState("lg");
  const [animation, setAnimation] = React.useState(false);
  const [selectedChar, setSelectedChar] = React.useState();

  //Imported classes for class select
  const [characterClasses, setCharacterClasses] = React.useState([
    "Barbarian",
    "Bard",
    "Cleric",
    "Druid",
    "Fighter",
    "Monk",
    "Paladin",
    "Ranger",
    "Rogue",
    "Sorcerer",
    "Warlock",
    "Wizard",
    "Artificer",
  ]);
  //Entryfield States
  const [name, setName] = React.useState("");
  const [hp, setHp] = React.useState("");
  const [ac, setAc] = React.useState("");
  const [initBonus, setInitBonus] = React.useState("");
  const [level, setLevel] = React.useState("");
  const [selectedClasses, setSelectedClasses] = React.useState([]);
  const [image, setImage] = React.useState();
  const [imageLoading, setImageLoading] = React.useState(false);
  const [imageLoaded, setImageLoaded] = React.useState(false);

  //Textfield Error States
  const [nameError, setNameError] = React.useState();
  const [hpError, setHpError] = React.useState();
  const [acError, setAcError] = React.useState();
  const [initBonusError, setInitBonusError] = React.useState();
  const [spellSaveDC, setSpellSaveDC] = React.useState();
  const [buttonDisable, setButtonDisable] = React.useState(true);

  const classes = useStyles();
  const open = props.openEditCharacter;
  const onClose = props.onClose;

  const Input = styled("input")({
    display: "none",
  });

  //Reset states on close
  const handleClose = () => {
    setName("");
    setHp("");
    setAc("");
    setInitBonus("");
    setSelectedClasses([]);
    setImageLoaded(false);
    setLevel("");
    setImage();
    setSelectedChar();
    onClose();
  };

  const handleCharClassSelected = (e, val) => {
    setSelectedClasses(val);
  };

  const handleUpdateChar = (e) => {
    e.preventDefault();
    let newCharacter = new Character();
    let newCharList = JSON.parse(JSON.stringify(props.characterList));
    let objIndex = newCharList.findIndex(
      (obj) => obj.name === selectedChar.name
    );
    newCharacter.name = name;
    newCharacter.level = level;
    newCharacter.hit_points = parseInt(hp);
    newCharacter.armor_class = parseInt(ac);
    newCharacter.initBonus = parseInt(initBonus);
    newCharacter.type = selectedClasses;
    newCharacter.spellSaveDC = spellSaveDC;
    newCharacter.img = image;
    newCharList[objIndex] = newCharacter;
    props.updateCharacterList(newCharList, newCharacter);
    handleClose();
  };

  const handleCharacterNameChange = (e) => {
    setName(e.target.value);
  };

  const handleCharacterLevelChange = (e) => {
    setLevel(e.target.value);
  };

  const handleCharacterHpChange = (e) => {
    setHp(e.target.value);
  };

  const handleCharacterAcChange = (e) => {
    setAc(e.target.value);
  };

  const handleCharacterInitChange = (e) => {
    setInitBonus(e.target.value);
  };

  const handleCharacterSpellSaveDCChange = (e) => {
    setSpellSaveDC(e.target.value);
  };

  const handleUploadClicked = (e) => {
    setImageLoading(true);
  };

  const handleSelectedChar = (e, val) => {
    let newChar = JSON.parse(JSON.stringify(val));
    setName(newChar.name);
    setHp(newChar.hit_points);
    setAc(newChar.armor_class);
    setInitBonus(newChar.initBonus);
    setSelectedClasses(newChar.type);
    setImageLoaded(true);
    setLevel(newChar.level);
    setImage(newChar.img);
    setSelectedChar(newChar);
  };

  const handleFileUpload = (e) => {
    setImageLoaded(true);
    setImageLoading(false);
    let img = document.getElementById("charImg");
    img.style.display = "";
    if (isElectron()) {
      const data = fs.readFileSync(e.target.files[0].path);
      setImage(
        "data:" + e.target.files[0].type + ";base64," + data.toString("base64")
      );
    } else {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  // const validateCharacterName = value => {
  //   let regex = '[^A-Za-z0-9\\s]';
  //   if (value === '') setNameError(true);
  //   else if (value.match(regex)) setNameError(true);
  //   else setNameError(false);
  // };

  // const validateNumberField = value => {
  //   let regex = '[^0-9]';
  //   if (value === '') setHpError(true);
  //   else if (value.match(regex)) setHpError(true);
  //   else setHpError(false);
  // };

  return (
    <div>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullScreen={fullScreen}
        maxWidth={maxWidth}
        fullWidth={true}
        classes={{ paper: classes.dialogSize }}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Edit Character
        </DialogTitle>
        <DialogContent>
          <div>
            <Box>
              <Autocomplete
                id="combo-box-demo"
                disableClearable
                options={props.characterList.sort((a, b) =>
                  a.name.localeCompare(b.name)
                )}
                getOptionLabel={(char) => char.name}
                onChange={handleSelectedChar}
                renderOption={(props, option, { selected }) => (
                  <li {...props}>
                    <Avatar src={option.img}></Avatar>
                    <span style={{ padding: "1em" }}>{option.name}</span>
                  </li>
                )}
                style={{
                  width: "100%",
                  paddingLeft: "8px",
                  paddingTop: "8px",
                  paddingBottom: "16px",
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Characters"
                    variant="outlined"
                    InputProps={{ ...params.InputProps, type: "search" }}
                  />
                )}
              />
            </Box>
            {selectedChar && (
              <Stack
                direction={{ xs: "column", sm: "row" }}
                sx={{ paddingTop: "16px" }}
                spacing={3}
              >
                <Box>
                  <Avatar
                    id="charImg"
                    sx={{ width: 500, height: 500 }}
                    src={image}
                  ></Avatar>
                  <label htmlFor="contained-button-file">
                    <Input
                      onChange={handleFileUpload}
                      accept="image/*"
                      id="contained-button-file"
                      multiple
                      type="file"
                    />
                    <LoadingButton
                      color="secondary"
                      variant="outlined"
                      component="span"
                      onClick={handleUploadClicked}
                      loading={imageLoading}
                    >
                      Upload
                    </LoadingButton>
                  </label>
                </Box>
                <form
                  onSubmit={handleUpdateChar}
                  id="edit-char-form"
                  className={classes.root}
                >
                  <Box>
                    <div className={classes.padBot}>
                      <TextField
                        className={classes.textField}
                        label="Character Name"
                        id="NewCharacterName"
                        helperText={
                          nameError && name.length > 0
                            ? "*must contain only letters"
                            : ""
                        }
                        onChange={handleCharacterNameChange}
                        error={nameError && name.length > 0 ? true : false}
                        value={name}
                      />
                    </div>

                    <div className={classes.padBot}>
                      <TextField
                        className={classes.textField}
                        label="Level"
                        id="NewCharacterLevel"
                        helperText={
                          hpError && level.length > 0
                            ? "*must contain only numbers"
                            : ""
                        }
                        error={hpError && hp.length > 0 ? true : false}
                        value={level}
                        onChange={handleCharacterLevelChange}
                      />
                    </div>

                    <div className={classes.padBot}>
                      <TextField
                        className={classes.textField}
                        label="Max HP"
                        id="NewCharacterHp"
                        helperText={
                          hpError && hp.length > 0
                            ? "*must contain only numbers"
                            : ""
                        }
                        error={hpError && hp.length > 0 ? true : false}
                        value={hp}
                        onChange={handleCharacterHpChange}
                      />
                    </div>

                    <div className={classes.padBot}>
                      <TextField
                        className={classes.textField}
                        label="AC"
                        id="NewCharacterAC"
                        error={acError && ac.length > 0 ? true : false}
                        helperText={
                          acError && ac.length > 0
                            ? "*must contain only numbers"
                            : ""
                        }
                        onChange={handleCharacterAcChange}
                        value={ac}
                      />
                    </div>

                    <div className={classes.padBot}>
                      <TextField
                        className={classes.textField}
                        label="Initiative Bonus"
                        id="NewcharacterInitBonus"
                        error={
                          initBonusError && initBonus.length > 0 ? true : false
                        }
                        helperText={
                          initBonusError && initBonus.length > 0
                            ? "*must contain only numbers and + or -, example +5 or -5"
                            : ""
                        }
                        onChange={handleCharacterInitChange}
                        value={initBonus}
                      />
                    </div>

                    <div className={classes.padBot}>
                      <TextField
                        className={classes.textField}
                        label="Spell Save DC"
                        id="NewcharacterSpellSaveDC"
                        onChange={handleCharacterSpellSaveDCChange}
                        value={spellSaveDC}
                      />
                    </div>

                    <div className={classes.padBot}>
                      <Autocomplete
                        id="CharacterClassSelect"
                        multiple
                        disableCloseOnSelect
                        options={characterClasses}
                        getOptionLabel={(characterClasses) => characterClasses}
                        onChange={handleCharClassSelected}
                        value={selectedClasses}
                        style={{ width: "100%" }}
                        renderOption={(props, option, { selected }) => (
                          <li {...props}>
                            <Checkbox
                              icon={icon}
                              checkedIcon={checkedIcon}
                              style={{ marginRight: 8 }}
                              checked={selected}
                            />
                            {option}
                          </li>
                        )}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            variant="outlined"
                            label="Classes"
                          />
                        )}
                      />
                    </div>
                  </Box>
                </form>
              </Stack>
            )}
          </div>
        </DialogContent>

        <DialogActions>
          <Button
            variant="contained"
            autoFocus
            onClick={handleUpdateChar}
            color="primary"
            type="submit"
            form="edit-char-form"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
