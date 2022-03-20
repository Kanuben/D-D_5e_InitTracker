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
import makeStyles from "@mui/styles/makeStyles";
import withStyles from "@mui/styles/withStyles";
import SvgIcon from "@mui/material/SvgIcon";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import Autocomplete from "@mui/material/Autocomplete";
import React from "react";
import { ReactComponent as Demo } from "../../../assets/demo.svg";
import { ReactComponent as Dragon } from "../../../assets/dragon.svg";
import SimpleCharacterCard from "../../SimpleCharacterCard";
import { Icon } from "@mui/material";
import { ResizableBox } from "react-resizable";

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
    minWidth: "800px",
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
      <Typography>{children}</Typography>
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

export default function AddMonster(props) {
  const open = props.openAddMonster;
  const onClose = props.onClose;
  const [selectedMon, setSelectedMon] = React.useState({});
  const [selectedList, setSelectedList] = React.useState([]);
  const [id, setId] = React.useState("m0");

  const classes = useStyles();
  const containerRef = React.useRef(null);

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
    props.handleSetInitList(newList);
    setSelectedList([]);
    setId("m0");
    handleClose();
  };

  const addToSelectedList = (selectedMon) => {
    let tempList = selectedList;
    let tempMon = JSON.parse(JSON.stringify(selectedMon));
    let filteredList = tempList.filter((char) => char.index === tempMon.index);
    if (filteredList.length > 0) {
      tempMon.name += " (" + filteredList.length + ")";
    }
    tempMon.id = generateId();
    tempList.push(tempMon);
    setSelectedList(tempList);
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
          <div ref={containerRef} className={classes.flex}>
            <Autocomplete
              id="combo-box-demo"
              disableClearable
              options={props.monList.sort((a, b) =>
                a.name.localeCompare(b.name)
              )}
              getOptionLabel={(mon) => mon.name}
              onChange={handleSelectedMon}
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Avatar>
                    <SvgIcon>
                      <Demo />
                    </SvgIcon>
                  </Avatar>
                  <span style={{ padding: "1em" }}>
                    {option.name} ({option.source})
                  </span>
                </li>
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
              color="secondary"
              variant="outlined"
              sx={{ width: 100 }}
            >
              Select
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
                  <Slide
                    key={monster.id}
                    direction="down"
                    in={true}
                    container={containerRef.current}
                    mountOnEnter
                  >
                    <ListItem key={monster.id}>
                      <SimpleCharacterCard
                        character={monster}
                        index={index}
                        selected={true}
                      />
                      <IconButton
                        onClick={() => {
                          removeFromSelectedList(monster);
                        }}
                        aria-label="delete"
                        size="large"
                      >
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
            onClick={addMonsters}
            color="primary"
          >
            Add To Initiative
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
