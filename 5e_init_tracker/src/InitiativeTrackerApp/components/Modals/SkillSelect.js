
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  inLine: {
    display: 'inline-flex',
  },

  gridText: {
    'align-self': 'center',
  },

  width: {
    width: '350px',
  },
}));

export default function ColorSelect(props) {
  const classes = useStyles();

  const [proficiencies, setProficiencies] = React.useState([
    { name: 'Acrobatics', proficiency: false, expertise: true },
    { name: 'Animal Handling', proficiency: false, expertise: false },
    { name: 'Arcana', proficiency: false, expertise: false },
    { name: 'Athletics', proficiency: false, expertise: false },
    { name: 'Deception', proficiency: false, expertise: false },
    { name: 'History', proficiency: false, expertise: false },
    { name: 'Insight', proficiency: false, expertise: false },
    { name: 'Intimidation', proficiency: false, expertise: false },
    { name: 'Investigation', proficiency: false, expertise: false },
    { name: 'Medicine', proficiency: false, expertise: false },
    { name: 'Nature', proficiency: false, expertise: false },
    { name: 'Perception', proficiency: false, expertise: false },
    { name: 'Preformance', proficiency: false, expertise: false },
    { name: 'Persuasion', proficiency: false, expertise: false },
    { name: 'Religion', proficiency: false, expertise: false },
    { name: 'Slight of Hand', proficiency: false, expertise: false },
    { name: 'Sealth', proficiency: false, expertise: false },
    { name: 'Survival', proficiency: false, expertise: false },
    { name: 'Pwning Newbs', proficiency: false, expertise: false },
  ]);

  const handleProChecked = e => {
    let tempSkills = [];
    Object.assign(tempSkills, proficiencies);

    tempSkills.forEach(item => {
      if (item.name === e.target.value) {
        item.proficiency = e.target.checked;
      }
    });
    setProficiencies(tempSkills);
  };

  const handleExpChecked = e => {
    let tempSkills = [];
    Object.assign(tempSkills, proficiencies);

    tempSkills.forEach(item => {
      if (item.name === e.target.value) {
        item.expertise = e.target.checked;
      }
    });
    setProficiencies(tempSkills);
  };

  function TableDescription(props) {
    return (
      <React.Fragment>
        <Grid item xs={4} style={{ display: 'inline' }}>
          <Typography>{props.skillName}</Typography>
        </Grid>

        <Grid item xs={4}>
          <Typography>{props.proficiency}</Typography>
        </Grid>

        <Grid item xs={4}>
          <Typography>{props.expertise}</Typography>
        </Grid>
      </React.Fragment>
    );
  }

  function Skill(props) {
    return (
      <React.Fragment>
        <Grid
          item
          xs={4}
          style={{ display: 'inline' }}
          className={classes.gridText}
        >
          <Typography>{props.skillName}</Typography>
        </Grid>

        <Grid item xs={4}>
          <Checkbox
            checked={props.proficiency}
            onChange={handleProChecked}
            value={props.skillName}
          />
        </Grid>

        <Grid item xs={4}>
          <Checkbox
            checked={props.expertise}
            onChange={handleExpChecked}
            value={props.skillName}
          />
        </Grid>
      </React.Fragment>
    );
  }

  return (
    <div className={classes.width}>
      <Grid container spacing={1} style={{ margin: '1%' }}>
        <Grid container item xs={12} spacing={3}>
          <TableDescription
            skillName="SKILL NAME"
            proficiency="PROFICIENCY"
            expertise="EXPERTISE"
          />
        </Grid>

        {proficiencies.map(item => (
          <Grid container item xs={12} spacing={3}>
            <Skill
              skillName={item.name}
              proficiency={item.proficiency}
              expertise={item.expertise}
            />
          </Grid>
        ))}


      </Grid>

    </div>
  );
}
