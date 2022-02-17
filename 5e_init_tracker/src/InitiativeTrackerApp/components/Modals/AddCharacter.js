import { ListItem } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import MuiDialogActions from "@mui/material/DialogActions";
import MuiDialogContent from "@mui/material/DialogContent";
import MuiDialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import Slide from "@mui/material/Slide";
import makeStyles from '@mui/styles/makeStyles';
import withStyles from '@mui/styles/withStyles';
import SvgIcon from "@mui/material/SvgIcon";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Autocomplete from '@mui/material/Autocomplete';
import React from "react";
import { ReactComponent as Dragon } from "../../assets/dragon.svg";
import SimpleCharacterCard from "../SimpleCharacterCard";
import DeleteIcon from "@mui/icons-material/Delete";

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
    paddingTop: theme.spacing(2),
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
    <MuiDialogTitle className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
          size="large">
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
  const containerRef = React.useRef(null);

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
    props.handleSetInitList(newList);
    setSelectedList([]);
    setId("c0");
    handleClose();
  };

  const addToSelectedList = (selectedChar) => {
    let tempList = selectedList;
    let tempChar = JSON.parse(JSON.stringify(selectedChar))
    let filteredCharList = tempList.filter(
      (char) => char.name === selectedChar.name
    );
    if (filteredCharList.length == 0) {
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
          <div ref={containerRef} className={classes.flex}>
            <Autocomplete
              id="combo-box-demo"
              freeSolo
              disableClearable
              options={props.charList}
              getOptionLabel={(char) => char.name}
              onChange={handleSelectedChar}
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Avatar src={option.img} />
                  <span style={{ padding: "1em" }}>{option.name}</span>
                </li>
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
              color="secondary"
              variant="outlined"
              sx={{ width: 100 }}
            >
              Add
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
                    direction="down"
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
                      <IconButton
                        onClick={() => {
                          removeFromSelectedList(character);
                        }}
                        aria-label="delete"
                        size="large">
                        <DeleteIcon fontSize="large" />
                      </IconButton>
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
