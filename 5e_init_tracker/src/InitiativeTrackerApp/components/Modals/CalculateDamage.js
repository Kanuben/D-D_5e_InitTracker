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
import Grid from '@material-ui/core/Grid';

export default function CalculateDamage (props) {
  const [damage, setDamage] = React.useState ('');

  const handleNumClick = e => {
    let num = e.target.textContent;
    let temp = '';
    setDamage (temp.concat (damage, num));
  };

  const handleSign = e => {
    let sign = e.target.textContent;
    let signValue = undefined;
    if (damage !== undefined) {
      signValue = damage.charAt (0);
    }
    let tempDamage = '';

    if (signValue !== undefined) {
      console.log ('SIGN: ' + sign + '\nSIGNVALUE: ' + signValue);

      if (sign !== '+' && sign !== '-') {
        setDamage (tempDamage.concat (sign, damage));
      } else if (signValue === '-' && sign === '+') {
        setDamage (damage.replace ('-', '+'));
      } else if (signValue === '+' && sign === '+') {
      } else if (signValue === '+' && sign === '-') {
        setDamage (damage.replace ('+', '-'));
      } else if (signValue === '-' && sign === '-') {
      } else {
        setDamage (''.concat (sign, damage));
      }
    }
  };

  const handleNeg = () => {
    let value = '-';

    if (damage.charAt (0) !== '-') {
      value = value.concat (damage);
      setDamage (value);
    }
  };

  const handleClear = () => {
    setDamage ('');
  };

  const enterDamage = () => {
    props.handleDamageChange(damage)
    closePop ();
  };

  const closePop = () => {
    props.handleDamageClose ();
  };

  return (
    <div style={{maxWidth: '200px', minHeight: '250px', padding: '2%'}}>

      <TextField disabled="true" value={damage} />
      <Grid container spacing={1} justify="center">
        <Grid item xs={12}>
          <Button onClick={handleNumClick}>0</Button>
          <Button onClick={handleNumClick}>1</Button>
          <Button onClick={handleNumClick}>2</Button>
        </Grid>

        <Grid item xs={12}>
          <Button onClick={handleNumClick}>3</Button>
          <Button onClick={handleNumClick}>4</Button>
          <Button onClick={handleNumClick}>5</Button>
        </Grid>

        <Grid item xs={12}>
          <Button onClick={handleNumClick}>6</Button>
          <Button onClick={handleNumClick}>7</Button>
          <Button onClick={handleNumClick}>8</Button>
        </Grid>

        <Grid item xs={12}>
          <Button onClick={handleSign}>-</Button>
          <Button onClick={handleNumClick}>9</Button>
          <Button onClick={handleSign}>+</Button>
        </Grid>

        <Grid item xs={8}>
          <Button onClick={handleClear}> clear </Button>
        </Grid>
        <Grid item xs={4}>
          <Button onClick={enterDamage}> enter </Button>
        </Grid>
      </Grid>

    </div>
  );
}
