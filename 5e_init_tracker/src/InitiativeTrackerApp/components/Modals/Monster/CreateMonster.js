import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CloseIcon from "@mui/icons-material/Close";
import Autocomplete from '@mui/material/Autocomplete';
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Checkbox from "@mui/material/Checkbox";
import Dialog from "@mui/material/Dialog";
import MuiDialogActions from "@mui/material/DialogActions";
import MuiDialogContent from "@mui/material/DialogContent";
import MuiDialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import makeStyles from '@mui/styles/makeStyles';
import withStyles from '@mui/styles/withStyles';
import React, { useEffect } from "react";
import { ajax } from "rxjs/ajax";
import { loadConditions } from "../../../../services/ConditionService";
import { loadSpells } from "../../../../services/SpellService";
import { Monster } from "../../../templates/monster";
import AddSpell from "../../AddSpell";
import Box from '@mui/material/Box';
import { toLower } from "lodash";
import MonsterForm from "./MonsterForm";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const useStyles = makeStyles((theme) => ({
  textField: {
    width: "100%",
  },
  root: {
    flexGrow: 1,
  },
  padding16: {
    padding: "16px",
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
    minHeight: "600px",
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

export default function CreateMonster(props) {
  const classes = useStyles();
  const open = props.openCreateMonster;
  const onClose = props.onClose;

  const handleFormDirty = (isDirty) => {
  };

  //Reset states on close
  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      fullWidth={true}
      classes={{ paper: classes.dialogSize }}
    >
      <DialogTitle id="customized-dialog-title" onClose={handleClose}>
        Create Monster
      </DialogTitle>
      <DialogContent>
        <MonsterForm
          monsterList={props.monsterList}
          updateMonsterList={props.updateMonsterList}
          onClose={handleClose}
          handleFormDirty={handleFormDirty}
        ></MonsterForm>
      </DialogContent>

      <DialogActions>
        <Button
          form='my-form'
          type="submit"
          variant="contained"
          autoFocus
          color="primary"
        >
          Create
        </Button>
      </DialogActions>
    </Dialog >
  );

  // function getNumberWithOrdinal(n) {
  //   var s = ["th", "st", "nd", "rd"],
  //     v = n % 100;
  //   return n + (s[(v - 20) % 10] || s[v] || s[0]);
  // }

}
