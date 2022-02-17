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
import Grid from '@mui/material/Grid';

export default function CalculateDamage(props) {
  const [damage, setDamage] = React.useState('');

  const handleNumClick = e => {
    let num = e.target.textContent;
    let temp = '';
    setDamage(temp.concat(damage, num));
  };

  const handleSign = e => {
    let sign = e.target.textContent;
    let signValue = undefined;
    if (damage !== undefined) {
      signValue = damage.charAt(0);
    }
    let tempDamage = '';

    if (signValue !== undefined) {
      if (sign !== '+' && sign !== '-') {
        setDamage(tempDamage.concat(sign, damage));
      } else if (signValue === '-' && sign === '+') {
        setDamage(damage.replace('-', '+'));
      } else if (signValue === '+' && sign === '+') {
      } else if (signValue === '+' && sign === '-') {
        setDamage(damage.replace('+', '-'));
      } else if (signValue === '-' && sign === '-') {
      } else {
        setDamage(''.concat(sign, damage));
      }
    }
  };

  const handleNeg = () => {
    let value = '-';

    if (damage.charAt(0) !== '-') {
      value = value.concat(damage);
      setDamage(value);
    }
  };

  const handleClear = () => {
    setDamage('');
  };

  const enterDamage = () => {
    props.handleDamageChange(damage)
    closePop();
  };

  const closePop = () => {
    props.handleDamageClose();
  };

  return (
    <div style={{ maxWidth: '200px', minHeight: '250px', padding: '2%' }}>

      <TextField disabled="true" value={damage} />
      <Grid container spacing={1} justifyContent="center">
        <Grid item xs={12}>
          <Button onClick={handleNumClick}>7</Button>
          <Button onClick={handleNumClick}>8</Button>
          <Button onClick={handleNumClick}>9</Button>
        </Grid>

        <Grid item xs={12}>
          <Button onClick={handleNumClick}>4</Button>
          <Button onClick={handleNumClick}>5</Button>
          <Button onClick={handleNumClick}>6</Button>
        </Grid>

        <Grid item xs={12}>
          <Button onClick={handleNumClick}>1</Button>
          <Button onClick={handleNumClick}>2</Button>
          <Button onClick={handleNumClick}>3</Button>
        </Grid>

        <Grid item xs={12}>
          <Button onClick={handleNumClick}>0</Button>
          <Button onClick={handleSign}>-</Button>
        </Grid>

        <Grid item xs={8}>
          <Button onClick={handleClear}>clear</Button>
        </Grid>
        <Grid item xs={4}>
          <Button onClick={enterDamage}>enter</Button>
        </Grid>
      </Grid>

    </div>
  );
}
