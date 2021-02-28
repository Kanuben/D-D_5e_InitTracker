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
import { ReactComponent as Demo } from "../../assets/demo.svg";
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

export default function AddMonster(props) {
  const open = props.openAddMonster;
  const onClose = props.onClose;
  const [selectedMon, setSelectedMon] = React.useState({});
  const [selectedList, setSelectedList] = React.useState([]);
  const [id, setId] = React.useState("m0");

  const classes = useStyles();

  const handleClose = () => {
    setSelectedMon({});
    onClose();
  };

  const handleSelectedMon = (e, val) => {
    setSelectedMon(val);
  };

  const addMonsters = () => {
    let newList = [];
    Object.assign(newList, props.initList);
    newList.push(...selectedList);
    props.setInitiativeList(newList);
    setSelectedList([]);
    setId("m0");
    handleClose();
  };

  const addToSelectedList = (selectedMon) => {
    let tempList = Object.create(selectedList);
    let filteredCharList = props.monList.filter((mon) => mon === selectedMon);
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

  const removeFromSelectedList = (monster) => {
    const newList = selectedList.filter((item) => item !== monster);
    setSelectedList(newList);
  };

  function generateId() {
    let tempId = parseInt(id.substring(1));
    props.initList.forEach((mon) => {
      let charId = parseInt(mon.id.substring(1));
      if (charId > tempId) {
        tempId = parseInt(mon.id.substring(1));
      }
    });
    tempId++;
    setId("m" + tempId);
    return "m" + tempId;
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
          Add Monster
        </DialogTitle>

        <DialogContent>
          <div className={classes.flex}>
            <Autocomplete
              id="combo-box-demo"
              freeSolo
              disableClearable
              options={props.monList.sort(
                (a, b) => a.challenge_rating - b.challenge_rating
              )}
              getOptionLabel={(mon) => mon.name}
              groupBy={(mon) => mon.challenge_rating}
              onChange={handleSelectedMon}
              renderOption={(mon) => (
                <React.Fragment>
                  <Avatar>
                    <SvgIcon>
                      <Demo />
                    </SvgIcon>
                  </Avatar>
                  <span style={{ padding: "1em" }}>{mon.name}</span>
                </React.Fragment>
              )}
              style={{ width: "85%" }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Monsters"
                  variant="outlined"
                  InputProps={{ ...params.InputProps, type: "search" }}
                />
              )}
            />
            <Button
              onClick={() => {
                addToSelectedList(selectedMon);
              }}
              autoFocus
              color="primary"
              variant="contained"
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
                {selectedList.map((monster, index) => (
                  <Slide key={monster.id} direction="up" in={true} mountOnEnter>
                    <ListItem key={monster.id}>
                      <SimpleCharacterCard
                        character={monster}
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
            onClick={addMonsters}
            color="primary"
          >
            Add Characters
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
