import Dialog from "@material-ui/core/Dialog";
import MuiDialogActions from "@material-ui/core/DialogActions";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import Button from "@material-ui/core/Button";
import charClassList from "../../assets/characterClasses.json";
import React, { useState, useEffect } from "react";
import CharacterTemplate from "../../templates/characterTemplate.json";
import Grid from "@material-ui/core/Grid";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const useStyles = makeStyles((theme) => ({
  textField: {
    width: "100%",
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

export default function CreateChar(props) {
  const classes = useStyles();
  const open = props.openCreateMonster;
  const onClose = props.onClose;

  //Reset states on close
  const handleClose = () => {
    onClose();
  };

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
          Create Monster
        </DialogTitle>
        <DialogContent>
          <form className={classes.root}>
            <div>
              <Grid container spacing={3}>
                <Grid item xs={4}>
                  <TextField
                    className={classes.textField}
                    id="outlined-basic"
                    label="Monster Name"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={4}>
                  <Autocomplete
                    id="combo-box-demo"
                    options={["test"]}
                    getOptionLabel={(option) => option}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Monster Type"
                        variant="outlined"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Autocomplete
                    id="combo-box-demo"
                    options={["test"]}
                    getOptionLabel={(option) => option}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Monster Sub-Type(s)"
                        variant="outlined"
                      />
                    )}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs={4}>
                  <Autocomplete
                    id="combo-box-demo"
                    options={["test"]}
                    getOptionLabel={(option) => option}
                    renderInput={(params) => (
                      <TextField {...params} label="Size" variant="outlined" />
                    )}
                  />
                </Grid>

                <Grid item xs={4}>
                  <Autocomplete
                    id="combo-box-demo"
                    options={["test"]}
                    getOptionLabel={(option) => option}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Alignment"
                        variant="outlined"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Autocomplete
                    id="combo-box-demo"
                    options={["test"]}
                    getOptionLabel={(option) => option}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Challenge Rating"
                        variant="outlined"
                      />
                    )}
                  />
                </Grid>
              </Grid>

              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <TextField
                    className={classes.textField}
                    id="outlined-multiline-static"
                    label="REACTIONS DESCRIPTION"
                    multiline
                    rows={6}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    className={classes.textField}
                    id="outlined-multiline-static"
                    label="ACTIONS DESCRIPTION"
                    multiline
                    rows={6}
                    variant="outlined"
                  />
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    className={classes.textField}
                    id="outlined-multiline-static"
                    label="SPECIAL TRAITS DESCRIPTION"
                    multiline
                    rows={6}
                    variant="outlined"
                  />
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <div style={{ display: "inline-flex", alignItems: "center" }}>
                    <Checkbox
                      inputProps={{ "aria-label": "primary checkbox" }}
                    />
                    <Typography>LEGENDARY?</Typography>
                  </div>
                  <TextField
                    className={classes.textField}
                    id="outlined-multiline-static"
                    label="LEGENDARY ACTIONS DESCRIPTION"
                    multiline
                    rows={6}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={6}>
                  <div style={{ display: "inline-flex", alignItems: "center" }}>
                    <Checkbox
                      inputProps={{ "aria-label": "primary checkbox" }}
                    />
                    <Typography>LAIR?</Typography>
                  </div>
                  <TextField
                    className={classes.textField}
                    id="outlined-multiline-static"
                    label="LAIR AND LAIR ACTIONS DESCRIPTION"
                    multiline
                    rows={6}
                    variant="outlined"
                  />
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs={3}>
                  <TextField
                    className={classes.textField}
                    id="outlined-basic"
                    label="Armor Class"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    className={classes.textField}
                    id="outlined-basic"
                    label="Passive Perception"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    className={classes.textField}
                    id="outlined-basic"
                    label="Hit Dice Count"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    className={classes.textField}
                    id="outlined-basic"
                    label="Hit Points Die Value"
                    variant="outlined"
                  />
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs={3}>
                  <TextField
                    className={classes.textField}
                    id="outlined-basic"
                    label="Average Hit Points"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    className={classes.textField}
                    id="outlined-basic"
                    label="STR Score"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    className={classes.textField}
                    id="outlined-basic"
                    label="DEX Score"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    className={classes.textField}
                    id="outlined-basic"
                    label="CON Score"
                    variant="outlined"
                  />
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs={3}>
                  <TextField
                    className={classes.textField}
                    id="outlined-basic"
                    label="INT Score"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    className={classes.textField}
                    id="outlined-basic"
                    label="WIS Score"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    className={classes.textField}
                    id="outlined-basic"
                    label="CHA Score"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={3}>
                  <Autocomplete
                    id="combo-box-demo"
                    multiple
                    disableCloseOnSelect
                    options={["test"]}
                    getOptionLabel={(option) => option}
                    //onChange={handleConditionSelected}
                    renderOption={(option, { selected }) => (
                      <React.Fragment>
                        <Checkbox
                          icon={icon}
                          checkedIcon={checkedIcon}
                          style={{ marginRight: 8 }}
                          checked={selected}
                        />
                        {option}
                      </React.Fragment>
                    )}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        label="Damage Resistances"
                      />
                    )}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs={3}>
                <Autocomplete
                    id="combo-box-demo"
                    multiple
                    disableCloseOnSelect
                    options={["test"]}
                    getOptionLabel={(option) => option}
                    //onChange={handleConditionSelected}
                    renderOption={(option, { selected }) => (
                      <React.Fragment>
                        <Checkbox
                          icon={icon}
                          checkedIcon={checkedIcon}
                          style={{ marginRight: 8 }}
                          checked={selected}
                        />
                        {option}
                      </React.Fragment>
                    )}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        label="Damage Immunities"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={3}>
                <Autocomplete
                    id="combo-box-demo"
                    multiple
                    disableCloseOnSelect
                    options={["test"]}
                    getOptionLabel={(option) => option}
                    //onChange={handleConditionSelected}
                    renderOption={(option, { selected }) => (
                      <React.Fragment>
                        <Checkbox
                          icon={icon}
                          checkedIcon={checkedIcon}
                          style={{ marginRight: 8 }}
                          checked={selected}
                        />
                        {option}
                      </React.Fragment>
                    )}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        label="Damage Vulnerabilities"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    className={classes.textField}
                    id="outlined-basic"
                    label="Languages"
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </div>
          </form>
        </DialogContent>

        <DialogActions>
          <Button variant="contained" autoFocus color="primary">
            Create Monster
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
