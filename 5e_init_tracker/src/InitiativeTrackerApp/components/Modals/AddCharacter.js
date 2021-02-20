import { ListItem } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogActions from "@material-ui/core/DialogActions";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import Slide from "@material-ui/core/Slide";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import SvgIcon from "@material-ui/core/SvgIcon";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Autocomplete from "@material-ui/lab/Autocomplete";
import React from "react";
import { ReactComponent as Dragon } from "../../assets/dragon.svg";
import SimpleCharacterCard from "../SimpleCharacterCard";

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
  dialogSize: {
    minHeight: "65%",
    minWidth: "40%",
    maxWidth: "40%",
    maxHeight: "65%",
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
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
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

export default function AddCharacter(props) {
  const open = props.openAddCharacter;
  const onClose = props.onClose;
  const [selectedChar, setSelectedChar] = React.useState({});
  const [selectedList, setSelectedList] = React.useState([]);
  const [id, setId] = React.useState("c0");

  const classes = useStyles();

  const handleClose = () => {
    onClose();
  };

  const handleSelectedChar = (e, val) => {
    setSelectedChar(val);
  };

  const addCharacters = () => {
    let newList = [];
    Object.assign(newList, props.initList);
    newList.push(...selectedList);
    props.setInitiativeList(newList);
    setSelectedList([]);
    setId("c0");
    handleClose();
  };

  const addToSelectedList = (selectedChar) => {
    let tempList = Object.create(selectedList);
    let filteredCharList = props.charList.filter(
      (char) => char === selectedChar
    );
    if (filteredCharList.length !== 0) {
      let tempChar = {};
      Object.assign(tempChar, ...filteredCharList);
      tempChar.id = generateId();
      tempList.push(tempChar);
      setSelectedList(tempList);
    } else {
      return;
    }
  };

  const removeFromSelectedList = (character) => {
    const newList = selectedList.filter((item) => item !== character);
    setSelectedList(newList);
  };

  function generateId() {
    let tempId = parseInt(id.substring(1));
    props.initList.forEach((char) => {
      let charId = parseInt(char.id.substring(1));
      if (charId > tempId) {
        tempId = parseInt(char.id.substring(1));
      }
    });
    tempId++;
    setId("c" + tempId);
    return "c" + tempId;
  }

  return (
    <div>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth={true}
        classes={{ paper: classes.dialogSize }}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Add Character
        </DialogTitle>

        <DialogContent>
          <div className={classes.flex}>
            <Autocomplete
              id="combo-box-demo"
              freeSolo
              disableClearable
              options={props.charList}
              getOptionLabel={(char) => char.name}
              onChange={handleSelectedChar}
              renderOption={(char) => (
                <React.Fragment>
                  <Avatar src={char.img} />
                  <span style={{ padding: "1em" }}>{char.name}</span>
                </React.Fragment>
              )}
              style={{ width: "85%" }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Characters"
                  variant="outlined"
                  InputProps={{ ...params.InputProps, type: "search" }}
                />
              )}
            />
            <Button
              onClick={() => {
                addToSelectedList(selectedChar);
              }}
              autoFocus
              color="primary"
            >
              Add To List
            </Button>
          </div>
          {selectedList.length === 0 && (
            <div className={classes.placeholder}>
              <div>
                <SvgIcon
                  style={{ width: "35vw", height: "45vh" }}
                  color="action"
                >
                  <Dragon />
                </SvgIcon>
              </div>
            </div>
          )}
          {selectedList.length !== 0 && (
            <div>
              <List>
                {selectedList.map((character, index) => (
                  <Slide
                    key={character.id}
                    direction="up"
                    in={true}
                    mountOnEnter
                  >
                    <ListItem key={character.id}>
                      <SimpleCharacterCard
                        character={character}
                        index={index}
                        selected={true}
                        removeFromSelectedList={removeFromSelectedList}
                      />
                    </ListItem>
                  </Slide>
                ))}
              </List>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            disabled={selectedList.length === 0}
            autoFocus
            onClick={addCharacters}
            color="primary"
          >
            Add Characters
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
