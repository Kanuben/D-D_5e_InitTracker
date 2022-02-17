import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import React from 'react';

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
