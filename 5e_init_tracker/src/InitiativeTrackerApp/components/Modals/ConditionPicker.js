import Button from "@mui/material/Button";
import Checkbox from '@mui/material/Checkbox';
import Dialog from "@mui/material/Dialog";
import MuiDialogActions from "@mui/material/DialogActions";
import MuiDialogContent from "@mui/material/DialogContent";
import MuiDialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import makeStyles from '@mui/styles/makeStyles';
import withStyles from '@mui/styles/withStyles';
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CloseIcon from "@mui/icons-material/Close";
import Autocomplete from '@mui/material/Autocomplete';
import React, { useEffect } from "react";
import { map } from "rxjs/operators";
import { loadConditions } from "../../../services/ConditionService";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
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

export default function ConditionPicker(props) {
  const classes = useStyles();
  const open = props.onOpen;
  const onClose = props.onClose;

  const [conditions, setConditions] = React.useState([]);
  const [selectedConditions, setSelectedConditions] = React.useState([]);

  const addConditions = () => {
    let newList = [];
    Object.assign(newList, props.initList);
    newList.map((character) => {
      if (character.id === props.character.id) {
        let tempStatuses = [];
        Object.assign(tempStatuses, character.statuses);
        selectedConditions.map(condition => {
          if (!tempStatuses.includes(condition)) {
            tempStatuses.push(condition)
          }
        })
        character.statuses = tempStatuses;
      }
    });
    props.setInitiativeList(newList);
    setSelectedConditions([]);
    handleClose();
  };

  useEffect(() => {
    loadConditions()
      .pipe(
        map((conditions) => {
          setConditions(conditions.results);
        })
      )
      .subscribe();
  }, []);

  const handleClose = () => {
    onClose();
  };

  const handleConditionSelected = (e, val) => {
    setSelectedConditions(val);
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
          Add Condition
        </DialogTitle>

        <DialogContent>
          <div>
            <Autocomplete
              id="combo-box-demo"
              multiple
              disableCloseOnSelect
              options={conditions}
              getOptionLabel={(condition) => condition.name}
              onChange={handleConditionSelected}
              style={{ width: "85%" }}
              renderOption={(option, { selected }) => (
                <React.Fragment>
                  <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    style={{ marginRight: 8 }}
                    checked={selected}
                  />
                  {option.name}
                </React.Fragment>
              )}
              renderInput={(params) => (
                <TextField {...params} variant="outlined" label="Conditions" />
              )}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            disabled={selectedConditions.length === 0}
            autoFocus
            onClick={addConditions}
            color="primary"
          >
            Add Conditions
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
