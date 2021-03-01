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
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import Button from '@material-ui/core/Button';
import charClassList from '../../assets/characterClasses.json';
import React, {useState, useEffect} from 'react';
import CharacterTemplate from '../../templates/characterTemplate.json';

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
  //Imported classes for class select
  const [characterClasses, setCharacterClasses] = React.useState (
    charClassList
  );
  //Entryfield States
  const [name, setName] = React.useState ('');
  const [hp, setHp] = React.useState ('');
  const [ac, setAc] = React.useState ('');
  const [initBonus, setInitBonus] = React.useState ('');
  const [selectedClasses, setSelectedClasses] = React.useState ('none');

  //Textfield Error States
  const [nameError, setNameError] = React.useState ();
  const [hpError, setHpError] = React.useState ();
  const [acError, setAcError] = React.useState ();
  const [initBonusError, setInitBonusError] = React.useState ();
  const [buttonDisable, setButtonDisable] = React.useState (true);

  useEffect (
    () => {
      validateCharacterIb (initBonus);
    },
    [initBonus]
  );

  useEffect (
    () => {
      validateCharacterHp (hp);
    },
    [hp]
  );

  useEffect (
    () => {
      validateCharacterAc (ac);
    },
    [ac]
  );

  useEffect (
    () => {
      validateCharacterName (name);
    },
    [name]
  );

  useEffect (
    () => {
      checkAllFields ();
    },
    [nameError, hpError, acError, initBonusError]
  );

  const classes = useStyles ();
  const open = props.openCreateCharacter;
  const onClose = props.onClose;

  //Reset states on close
  const handleClose = () => {
    setName ('');
    setHp ('');
    setAc ('');
    setInitBonus ('');
    setSelectedClasses ('');

    onClose ();
  };

  const handleCharClassSelected = (e, val) => {
    setSelectedClasses (val);
  };

  const handleCreateChar = () => {
    let newCharacter = {...CharacterTemplate};
    newCharacter.name = name;
    newCharacter.hit_points = hp;
    newCharacter.armor_class = ac;
    newCharacter.initBonus = initBonus;
    newCharacter.type = selectedClasses;

    props.handleAppendCharacterList ([newCharacter]);
    handleClose ();
  };

  const handleCharacterNameChange = e => {
    setName (e.target.value);
  };

  const handleCharacterHpChange = e => {
    setHp (e.target.value);
  };

  const handleCharacterAcChange = e => {
    setAc (e.target.value);
  };

  const handleCharacterIbChange = e => {
    setInitBonus (e.target.value);
  };

  const validateCharacterName = value => {
    let regex = '[^A-Za-z0-9\\s]';
    if (value === '') setNameError (true);
    else if (value.match (regex)) setNameError (true);
    else setNameError (false);
  };

  const validateCharacterHp = value => {
    let regex = '[^0-9]';
    if (value === '') setHpError (true);
    else if (value.match (regex)) setHpError (true);
    else setHpError (false);
  };

  const validateCharacterAc = value => {
    let regex = '[^0-9]';
    if (value === '') setAcError (true);
    else if (value.match (regex)) setAcError (true);
    else setAcError (false);
  };

  const validateCharacterIb = value => {
    let regex = '[^0-9-+]';
    if (value === '') setInitBonusError (true);
    else if (value.match (regex)) setInitBonusError (true);
    else setInitBonusError (false);
  };

  const checkAllFields = () => {
    let flag =
      nameError === false &&
      name != '' &&
      (hpError === false && hp !== '') &&
      (acError === false && ac !== '') &&
      (initBonusError === false && initBonus !== '');

    if (flag === true) setButtonDisable (false);
    else setButtonDisable (true);
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
              <img
                src="https://reactnativecode.com/wp-content/uploads/2018/01/Error_Img.png"
                className={classes.centerImg}
              />
            </div>

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
                    <TextField {...params} variant="outlined" label="Classes" />
                  )}
                />
              </div>
            </form>

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
