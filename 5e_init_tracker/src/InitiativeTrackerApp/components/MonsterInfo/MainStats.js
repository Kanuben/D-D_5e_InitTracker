import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import CardContent from '@material-ui/core/CardContent';
import AppBar from '@material-ui/core/AppBar';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import ListItem from '@material-ui/core/ListItem';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import {bindNodeCallback} from 'rxjs';

const useStyles = makeStyles (theme => ({
  popover: {
    pointerEvents: 'none',
  },
  link: {
    color: theme.palette.secondary.main,
  },
  cardwidth: {
    width: 'inherit',
  },
  root: {
    flexGrow: 1,
  },
  char: {
    display: 'flex',
    'align-items': 'center',
  },
  charname: {
    padding: '.5em',
    'font-size': '1em',
  },
  col: {
    padding: theme.spacing (2),
    color: theme.palette.text.secondary,
    'align-items': 'center',
    display: 'inline-flex',
    'justify-items': 'center',
    'white-space': 'nowrap',
  },
  char_portrait: {
    width: theme.spacing (8),
    height: theme.spacing (8),
    'border-style': 'solid',
    'border-color': 'darkgrey',
    'border-width': '.25em',
  },
  paper_padding: {
    padding: '1em',
  },

  background_blue: {
    'background-color': 'blue',
  },
  headingColor: {
    color: theme.palette.primary.main,
    'font-weight': 'bold',
  },
  textColor: {
    color: theme.palette.secondary.main,
  },
  proficienciesDesc: {
    display: 'inline-flex',
  },
}));

export default function MainStats (props) {
  //styling
  const theme = useTheme ();
  const classes = useStyles (theme);

  //helper functions
  const isSubtype = () => {
    let subtype = '';
    if (props.monster.subtype !== null)
      subtype = subtype.concat ('(' + props.monster.subtype + ')');

    return subtype;
  };

  //monster varaibles
  let savingThrows = [];
  let skills = [];
  let damageImmunities = [];
  let damageResistances = [];
  let damageVulnerabilties = [];
  let condidtionImmunities = [];

  //Initialization of monster data
  if (props.monster) {
    //load proficiences
    savingThrows.push (
      {
        name: 'STR',
        value: Math.floor ((props.monster.stats.strength - 10) / 2),
      },
      {
        name: 'DEX',
        value: Math.floor ((props.monster.stats.dexterity - 10) / 2),
      },
      {
        name: 'CON',
        value: Math.floor ((props.monster.stats.constitution - 10) / 2),
      },
      {
        name: 'INT',
        value: Math.floor ((props.monster.stats.intelligence - 10) / 2),
      },
      {name: 'WIS', value: Math.floor ((props.monster.stats.wisdom - 10) / 2)},
      {name: 'CHA', value: Math.floor ((props.monster.stats.charisma - 10) / 2)}
    );

    props.monster.proficiencies.forEach (element => {
      if (element.name.includes ('STR')) {
        savingThrows[0].value = element.value;
      }
      if (element.name.includes ('DEX')) {
        savingThrows[1].value = element.value;
      }
      if (element.name.includes ('CON')) {
        savingThrows[2].value = element.value;
      }
      if (element.name.includes ('INT')) {
        savingThrows[3].value = element.value;
      }
      if (element.name.includes ('WIS')) {
        savingThrows[4].value = element.value;
      }
      if (element.name.includes ('CHA')) {
        savingThrows[5].value = element.value;
      }

      if (
        !element.name.includes ('STR') &&
        !element.name.includes ('DEX') &&
        !element.name.includes ('CON') &&
        !element.name.includes ('INT') &&
        !element.name.includes ('WIS') &&
        !element.name.includes ('CHA')
      ) {
        skills.push ({
          name: element.name,
          value: element.value,
        });
      }
    });

    //load damage vulnerabilities
    if (props.monster.damage_vulnerabilities !== undefined) {
      props.monster.damage_vulnerabilities.forEach (item => {
        damageVulnerabilties.push (item);
      });
    }
    //load damage resistances
    if (props.monster.damage_resistances !== undefined) {
      props.monster.damage_resistances.forEach (item => {
        damageResistances.push (item);
      });
    }
    //load damage immunities
    if (props.monster.damage_immunities !== undefined) {
      props.monster.damage_immunities.forEach (item => {
        damageImmunities.push (item);
      });
    }
    //load condidtion immunities
    if (props.monster.condition_immunities !== undefined) {
      props.monster.condition_immunities.forEach (item => {
        condidtionImmunities.push (item.name);
      });
    }
  }

  return (
    <div>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h4" gutterBottom>
            {props.monster.name}
          </Typography>
          <Typography variant="body1" gutterBottom>
            &nbsp;( {props.monster.size} - {props.monster.type}
            {isSubtype ()}, {props.monster.alignment} )
          </Typography>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <CardContent>
        <div>Armor Class {props.monster.armor_class}</div>
        <div>
          Hit Points {props.monster.hit_points} ({props.monster.hit_dice}+
          {parseInt (props.monster.hit_dice) *
            Math.floor ((props.monster.stats.constitution - 10) / 2)}
          )
        </div>
        <div>
          Speed {props.monster.speed}
          <div
            style={{
              display: 'flex',
              'flex-direction': 'row-reverse',
              color: 'red',
            }}
          >
            <Typography variant="body2" className={classes.textColor}>
              *saving throws
            </Typography>
          </div>
        </div>
        <Divider />
        <div>
          {/* main stat block */}
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="flex-start"
            container
            spacing={1}
          >
            <Grid item xs={2}>
              STR
            </Grid>
            <Grid item xs={2}>
              DEX
            </Grid>
            <Grid item xs={2}>
              CON
            </Grid>
            <Grid item xs={2}>
              INT
            </Grid>
            <Grid item xs={2}>
              WIS
            </Grid>
            <Grid item xs={2}>
              CHA
            </Grid>
          </Grid>

          {/* main stat modifiers block */}
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="flex-start"
            container
            spacing={1}
          >
            <Grid item xs={2}>
              {props.monster.stats.strength}
              {' '}
              (
              {Math.floor ((props.monster.stats.strength - 10) / 2)}
              )
            </Grid>
            <Grid item xs={2}>
              {props.monster.stats.dexterity}
              {' '}
              (
              {Math.floor ((props.monster.stats.dexterity - 10) / 2)}
              )
            </Grid>
            <Grid item xs={2}>
              {props.monster.stats.constitution}
              {' '}
              (
              {Math.floor ((props.monster.stats.constitution - 10) / 2)}
              )
            </Grid>
            <Grid item xs={2}>
              {props.monster.stats.intelligence}
              {' '}
              (
              {Math.floor ((props.monster.stats.intelligence - 10) / 2)}
              )
            </Grid>
            <Grid item xs={2}>
              {props.monster.stats.wisdom}
              {' '}
              (
              {Math.floor ((props.monster.stats.wisdom - 10) / 2)}
              )
            </Grid>
            <Grid item xs={2}>
              {props.monster.stats.charisma}
              {' '}
              (
              {Math.floor ((props.monster.stats.charisma - 10) / 2)}
              )
            </Grid>
          </Grid>

          {/* saving throws block */}
          {savingThrows.length !== 0 &&
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="flex-start"
              container
              spacing={1}
            >
              {savingThrows.map ((savingThrow, index) => (
                <Grid item xs={2}>
                  <Typography className={classes.textColor}>
                    {savingThrow.value}
                  </Typography>
                </Grid>
              ))}
            </Grid>}
        </div>
        <Divider />

        {/* display skills */}
        <Typography variant="h6"> Attributes </Typography>
        <List>
          {skills.length !== 0 &&
            <ListItem dense={true}>

              <Typography variant="body1" className={classes.headingColor}>
                Skills:<span>&nbsp;&nbsp;</span>
              </Typography>
              <div className={classes.proficienciesDesc}>
                {skills.map ((prof, index) => (
                  <Typography variant="body2" color={'textPrimary'}>
                    {prof.name} +{prof.value}<span>&nbsp;&nbsp;</span>
                  </Typography>
                ))}

              </div>
            </ListItem>}

          {/* display damage vulnerabilities */}
          {damageVulnerabilties.length !== 0 &&
            <ListItem dense={true}>

              <Typography variant="body1" className={classes.headingColor}>
                Damage Vulnerabilties:<span>&nbsp;&nbsp;</span>
              </Typography>
              <div className={classes.proficienciesDesc}>
                {damageVulnerabilties.map ((vulnerabilties, index) => (
                  <Typography variant="body2">
                    {vulnerabilties} <span>&nbsp;&nbsp;</span>
                  </Typography>
                ))}
              </div>

            </ListItem>}

          {/* display damage resistance */}
          {damageResistances.length !== 0 &&
            <ListItem dense={true}>

              <Typography variant="body1" className={classes.headingColor}>
                Damage Resistance:<span>&nbsp;&nbsp;</span>
              </Typography>
              <div className={classes.proficienciesDesc}>
                {damageResistances.map ((resistance, index) => (
                  <Typography variant="body2">
                    {resistance} <span>&nbsp;&nbsp;</span>
                  </Typography>
                ))}
              </div>

            </ListItem>}

          {/* display damage immunities */}
          {damageImmunities.length !== 0 &&
            <ListItem dense={true}>

              <Typography variant="body1" className={classes.headingColor}>
                Damage Immunities:<span>&nbsp;&nbsp;</span>
              </Typography>
              <div className={classes.proficienciesDesc}>
                {damageImmunities.map ((immunities, index) => (
                  <Typography variant="body2">
                    {immunities} <span>&nbsp;&nbsp;</span>
                  </Typography>
                ))}
              </div>

            </ListItem>}

          {/* display condition immunities */}
          {condidtionImmunities.length !== 0 &&
            <ListItem dense={true}>

              <Typography variant="body1" className={classes.headingColor}>
                Condition Immunities:<span>&nbsp;&nbsp;</span>
              </Typography>
              <div className={classes.proficienciesDesc}>
                {' '}
                {' '}{' '}{' '}{' '}{' '}{' '}{' '}
                {condidtionImmunities.map ((immunities, index) => (
                  <Typography variant="body2">
                    {immunities} <span>&nbsp;&nbsp;</span>{' '}
                  </Typography>
                ))}
              </div>

            </ListItem>}

          {/* display senses */}
          {props.monster.senses.length !== 0 &&
            <ListItem dense={true}>

              <Typography variant="body1" className={classes.headingColor}>
                Senses:<span>&nbsp;&nbsp;</span>
              </Typography>
              <Typography variant="body2">
                {props.monster.senses}
              </Typography>

            </ListItem>}

          {/* display languages */}
          {props.monster.senses.length !== 0 &&
            <ListItem dense={true}>

              <Typography variant="body1" className={classes.headingColor}>
                Languages:<span>&nbsp;&nbsp;</span>
              </Typography>
              <Typography variant="body2">
                {props.monster.languages}
              </Typography>

            </ListItem>}

          {/* display cr */}
          <ListItem dense={true}>
            <Typography variant="body1" className={classes.headingColor}>
              Challenge Raiting:<span>&nbsp;&nbsp;</span>
            </Typography>
            <Typography variant="body2">
              {props.monster.challenge_rating}
            </Typography>
          </ListItem>
        </List>
        <Divider />

        {props.monster.special_abilities.length !== 0 &&
          <div>
            {props.monster.special_abilities.length !== 0 &&
              <div>
                <Typography variant="h6">Special Abilities</Typography>
                <List>
                  {props.monster.special_abilities.map ((item, index) => (
                    <ListItem dense={true}>
                      <div>
                        <Typography
                          variant="body1"
                          className={classes.headingColor}
                        >
                          {' '}{item.name}{' '}

                        </Typography>
                        <Typography variant="body2">
                          {' '}{item.desc}{' '}
                        </Typography>
                      </div>
                    </ListItem>
                  ))}
                </List>

              </div>}
          </div>}
      </CardContent>
    </div>
  );
}
