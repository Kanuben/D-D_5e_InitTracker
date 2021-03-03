import Button from "@material-ui/core/Button";
import Checkbox from '@material-ui/core/Checkbox';
import Dialog from "@material-ui/core/Dialog";
import MuiDialogActions from "@material-ui/core/DialogActions";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CloseIcon from "@material-ui/icons/Close";
import Autocomplete from "@material-ui/lab/Autocomplete";
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

export default function ConditionPicker(props) {
  const classes = useStyles();
  const open = props.onOpen;
  const onClose = props.onClose;

  const [conditions, setConditions] = React.useState([]);
  const [selectedConditions, setSelectedConditions]= React.useState([]);

  const addConditions = () => {
    let newList = [];
    Object.assign(newList, props.initList);
    newList.map((character) => {
      if (character.id === props.character.id) {
        let tempStatuses = [];
        Object.assign(tempStatuses, character.statuses);
        selectedConditions.map(condition =>{
          if(!tempStatuses.includes(condition)){
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

  const handleConditionSelected = (e,val) => {
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
                <TextField {...params} variant="outlined" label="Conditions"  />
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
