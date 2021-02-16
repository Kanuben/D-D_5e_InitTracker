import { ListItem } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogActions from "@material-ui/core/DialogActions";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import List from "@material-ui/core/List";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Slide from "@material-ui/core/Slide";
import { fade, makeStyles, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import PersonIcon from "@material-ui/icons/Person";
import SearchIcon from "@material-ui/icons/Search";
import React from "react";
import SimpleCharacterCard from "../SimpleCharacterCard";

const useStyles = makeStyles((theme) => ({
  column: {
    width: '50%',
    float: "left",
  },
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
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.black, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.black, 0.25),
    },
    marginLeft: 0,
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
  dialogSize: {
    minHeight: "65%",
    minWidth: "50%",
    maxWidth: "50%",
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
  const [searchText, setSearchText] = React.useState("");
  const [selectedList, setSelectedList] = React.useState([]);
  const [id,setId] = React.useState(0);

  const handleClose = () => {
    onClose();
  };

  const addCharacters = () =>{
    let newList = [];
    Object.assign(newList, props.initList);
    newList.push(...selectedList);
    props.setInitiativeList(newList);
    setSelectedList([]);
    handleClose();
  }

  const classes = useStyles();

  let setText = (e) => {
    setSearchText(e.target.value);
  };

  const addToSelectedList = (character) => {
    let tempList = Object.create(selectedList);
    let tempChar = {};
    Object.assign(tempChar,character); 
    tempChar.id = generateId(character);
    tempList.push(tempChar);
    setSelectedList(tempList);
  };

  const removeFromSelectedList = (character) => {
    const newList = selectedList.filter((item) => item !== character);
    setSelectedList(newList);
  };

  function generateId(character) {
    let tempId = id;
    props.initList.forEach(char => {
      if(char.id > tempId){
        tempId = char.id;
      }
    });
    tempId++;
    setId(tempId);
    return id;
  }

  return (
    <div>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth={true}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Add Character
        </DialogTitle>

        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search…"
            onChange={setText}
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ "aria-label": "search" }}
          />
        </div>
        <DialogContent>
          <div className={classes.column}>
            <List>
              {props.charList
                .filter((character) =>
                  character.name.toLowerCase().includes(searchText)
                )
                .map((character, index) => (
                  <Slide direction="up" in={true} mountOnEnter>
                    <ListItem key={character.id}>
                      <SimpleCharacterCard
                        character={character}
                        index={index}
                        addToSelectedList={addToSelectedList}
                        selected={false}
                      />
                    </ListItem>
                  </Slide>
                ))}
                         
            </List>
          </div>

          <div className={classes.column}>
            <List>
              {selectedList.map((character, index) => (
                <Slide direction="up" in={true} mountOnEnter>
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
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={addCharacters} color="primary">
            Add Characters
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
