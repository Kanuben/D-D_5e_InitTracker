import Dialog from '@material-ui/core/Dialog';
import MuiDialogActions from '@material-ui/core/DialogActions';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import Button from "@material-ui/core/Button";
import charClassList from "../../assets/characterClasses.json"

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const useStyles = makeStyles (theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing (2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up ('sm')]: {
      display: 'block',
    },
  },
  flex: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  placeholder: {
    display: 'flex',
    'justify-content': 'center',
    'align-items': 'center',
    'flex-direction': 'column',
  },
  dialogSize: {
    minHeight: '65%',
    minWidth: '40%',
    maxWidth: '40%',
    maxHeight: '65%',
  },
  textField: {
    width: '100%',
  },
  padBot: {
    "padding-bottom": '2%',
  },
  centerImg: {
    "margin-left": "auto",
    "margin-right":" auto",
    width: "30%",
    display: "block",
    "border-radius": "10%"
  }
}));

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing (2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing (1),
    top: theme.spacing (1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles (styles) (props => {
  const {children, classes, onClose, ...other} = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose
        ? <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={onClose}
          >
            <CloseIcon />
          </IconButton>
        : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles (theme => ({
  root: {
    padding: theme.spacing (2),
  },
})) (MuiDialogContent);

const DialogActions = withStyles (theme => ({
  root: {
    margin: 0,
    padding: theme.spacing (1),
  },
})) (MuiDialogActions);

export default function CreateChar (props) {
  const [charClasses, setCharClasses] = React.useState (charClassList);
  const [selectedCharClasses, setSelectedCharClasses] = React.useState ([]);

  const classes = useStyles ();
  const open = props.openCreateCharacter;
  const onClose = props.onClose;

  const handleClose = () => {
    onClose ();
  };

  const handleCharClassSelected = (e, val) => {
    setSelectedCharClasses (val);
  };

  return (
    <div>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth={true}
        classes={{paper: classes.dialogSize}}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Create Character
        </DialogTitle>
        <DialogContent>
          <div>
              <div>
              <img src="https://reactnativecode.com/wp-content/uploads/2018/01/Error_Img.png" className={classes.centerImg}/>
              </div>

       
              <form className={classes.root}
              >
                <div className={classes.padBot}>
                  <TextField
                    className={classes.textField}
                    label="Character Name"
                  />
                </div>
                <div className={classes.padBot}>
                  <TextField className={classes.textField} label="Max HP" />
                </div>
                <div className={classes.padBot}>
                  <TextField className={classes.textField} label="AC" />
                </div>
                <div className={classes.padBot}>
                  <TextField
                    className={classes.textField}
                    label="Initiative Bonus"
                  />
                </div>
                <div className={classes.padBot} >
                  <Autocomplete
                    id="combo-box-demo"

                    multiple
                    disableCloseOnSelect
                    options={charClasses}
                    getOptionLabel={charClasses => charClasses}
                    onChange={handleCharClassSelected}
                    style={{width: '100%'}}
                    renderOption={(option, {selected}) => (
                      <React.Fragment>
                        <Checkbox
                          icon={icon}
                          checkedIcon={checkedIcon}
                          style={{marginRight: 8}}
                          checked={selected}
                        />
                        {option}
                      </React.Fragment>
                    )}
                    renderInput={params => (
                      <TextField
                        {...params}
                        variant="outlined"
                        label="Classes"
                      />
                    )}
                  />
                </div>
              </form>
              
           
          </div>
        </DialogContent>

        <DialogActions>
          <Button
            variant="contained"
            disabled={true}
            autoFocus
            // onClick={}
            color="primary"
          >
            Create Character
          </Button>
        </DialogActions>
      </Dialog>

    </div>
  );
}
