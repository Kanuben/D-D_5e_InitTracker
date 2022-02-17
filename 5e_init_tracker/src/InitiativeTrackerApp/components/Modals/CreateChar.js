import Dialog from '@mui/material/Dialog';
import MuiDialogActions from '@mui/material/DialogActions';
import MuiDialogContent from '@mui/material/DialogContent';
import MuiDialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import makeStyles from '@mui/styles/makeStyles';
import withStyles from '@mui/styles/withStyles';
import Autocomplete from '@mui/material/Autocomplete';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import Button from '@mui/material/Button';
import charClassList from '../../assets/characterClasses.json';
import React, { useState, useEffect } from 'react';
import CharacterTemplate from '../../templates/characterTemplate.json';
import { Grid } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
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
    'padding-bottom': '2%',
  },
  centerImg: {
    'margin-left': 'auto',
    'margin-right': ' auto',
    width: '30%',
    display: 'block',
    'border-radius': '10%',
  },
}));

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose
        ? <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
          size="large">
          <CloseIcon />
        </IconButton>
        : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function CreateChar(props) {
  //Imported classes for class select
  const [characterClasses, setCharacterClasses] = React.useState(
    charClassList
  );
  //Entryfield States
  const [name, setName] = React.useState('');
  const [hp, setHp] = React.useState('');
  const [ac, setAc] = React.useState('');
  const [initBonus, setInitBonus] = React.useState('');
  const [selectedClasses, setSelectedClasses] = React.useState('none');

  //Textfield Error States
  const [nameError, setNameError] = React.useState();
  const [hpError, setHpError] = React.useState();
  const [acError, setAcError] = React.useState();
  const [initBonusError, setInitBonusError] = React.useState();
  const [buttonDisable, setButtonDisable] = React.useState(true);

  const classes = useStyles();
  const open = props.openCreateCharacter;
  const onClose = props.onClose;

  //Reset states on close
  const handleClose = () => {
    setName('');
    setHp('');
    setAc('');
    setInitBonus('');
    setSelectedClasses('');

    onClose();
  };

  const handleCharClassSelected = (e, val) => {
    setSelectedClasses(val);
  };

  const handleCreateChar = () => {
    let newCharacter = { ...CharacterTemplate };
    newCharacter.name = name;
    newCharacter.hit_points = parseInt(hp);
    newCharacter.armor_class = parseInt(ac);
    newCharacter.initBonus = parseInt(initBonus);
    newCharacter.type = selectedClasses;

    props.handleAppendCharacterList([newCharacter]);
    handleClose();
  };

  const handleCharacterNameChange = e => {
    setName(e.target.value);
  };

  const handleCharacterHpChange = e => {
    setHp(e.target.value);
  };

  const handleCharacterAcChange = e => {
    setAc(e.target.value);
  };

  const handleCharacterIbChange = e => {
    setInitBonus(e.target.value);
  };

  const validateCharacterName = value => {
    let regex = '[^A-Za-z0-9\\s]';
    if (value === '') setNameError(true);
    else if (value.match(regex)) setNameError(true);
    else setNameError(false);
  };

  const validateNumberField = value => {
    let regex = '[^0-9]';
    if (value === '') setHpError(true);
    else if (value.match(regex)) setHpError(true);
    else setHpError(false);
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
          Create Character
        </DialogTitle>
        <DialogContent>
          <div>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <Skeleton variant="rectangular" width={210} height={118} />
                <div>
                  <img
                    src="https://reactnativecode.com/wp-content/uploads/2018/01/Error_Img.png"
                    className={classes.centerImg}
                  />
                </div>
              </Grid>
              <Grid item xs={6}>
                <form className={classes.root}>
                  <div className={classes.padBot}>
                    <TextField
                      className={classes.textField}
                      label="Character Name"
                      id="NewCharacterName"
                      helperText={
                        nameError && name.length > 0
                          ? '*must contain only letters'
                          : ''
                      }
                      onChange={handleCharacterNameChange}
                      error={nameError && name.length > 0 ? true : false}
                      value={name}
                    />
                  </div>

                  <div className={classes.padBot}>
                    <TextField
                      className={classes.textField}
                      label="Max HP"
                      id="NewCharacterHp"
                      helperText={
                        hpError && hp.length > 0 ? '*must contain only numbers' : ''
                      }
                      error={hpError && hp.length > 0 ? true : false}
                      value={hp}
                      onChange={handleCharacterHpChange}
                    />

                  </div>

                  <div className={classes.padBot}>
                    <TextField
                      className={classes.textField}
                      label="AC"
                      id="NewCharacterAC"
                      error={acError && ac.length > 0 ? true : false}
                      helperText={
                        acError && ac.length > 0 ? '*must contain only numbers' : ''
                      }
                      onChange={handleCharacterAcChange}
                      value={ac}
                    />
                  </div>

                  <div className={classes.padBot}>
                    <TextField
                      className={classes.textField}
                      label="Initiative Bonus"
                      id="NewcharacterIb"
                      error={initBonusError && initBonus.length > 0 ? true : false}
                      helperText={
                        initBonusError && initBonus.length > 0
                          ? '*must contain only numbers and + or -, example +5 or -5'
                          : ''
                      }
                      onChange={handleCharacterIbChange}
                      value={initBonus}
                    />
                  </div>

                  <div className={classes.padBot}>
                    <Autocomplete
                      id="CharacterClassSelect"
                      multiple
                      disableCloseOnSelect
                      options={characterClasses}
                      getOptionLabel={characterClasses => characterClasses}
                      onChange={handleCharClassSelected}
                      style={{ width: '100%' }}
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
                      renderInput={params => (
                        <TextField {...params} variant="outlined" label="Classes" />
                      )}
                    />
                  </div>
                </form>
              </Grid>
            </Grid>
          </div>
        </DialogContent>

        <DialogActions>
          <Button
            variant="contained"
            disabled={buttonDisable}
            autoFocus
            onClick={handleCreateChar}
            color="primary"
          >
            Create Character
          </Button>
        </DialogActions>
      </Dialog>

    </div>
  );
}
