import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import CardContent from "@mui/material/CardContent";
import AppBar from "@mui/material/AppBar";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import ListItem from "@mui/material/ListItem";
import { useTheme } from "@mui/material/styles";
import makeStyles from "@mui/styles/makeStyles";
import List from "@mui/material/List";
import { bindNodeCallback } from "rxjs";
import { ReactComponent as Monster } from "../../assets/monster.svg";
import SvgIcon from "@mui/material/SvgIcon";

const useStyles = makeStyles((theme) => ({
  popover: {
    pointerEvents: "none",
  },
  link: {
    color: theme.palette.secondary.main,
  },
  cardwidth: {
    width: "inherit",
  },
  root: {
    flexGrow: 1,
  },
  char: {
    display: "flex",
    "align-items": "center",
  },
  charname: {
    padding: ".5em",
    "font-size": "1em",
  },
  col: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
    "align-items": "center",
    display: "inline-flex",
    "justify-items": "center",
    "white-space": "nowrap",
  },
  char_portrait: {
    width: theme.spacing(8),
    height: theme.spacing(8),
    "border-style": "solid",
    "border-color": "darkgrey",
    "border-width": ".25em",
  },
  paper_padding: {
    padding: "1em",
  },

  background_blue: {
    "background-color": "blue",
  },
  headingColor: {
    color: theme.palette.secondary.main,
    "font-weight": "bold",
  },
  textColor: {
    color: theme.palette.secondary.main,
  },
  proficienciesDesc: {
    display: "inline-flex",
    flexWrap: "wrap",
  },
}));

export default function MainStats(props) {
  //styling
  const theme = useTheme();
  const classes = useStyles(theme);

  //monster varaibles
  let savingThrows = [];
  let skills = [];
  let damageImmunities = [];
  let damageResistances = [];
  let damageVulnerabilties = [];
  let condidtionImmunities = [];

  const getProficiencyBonus = (challengeRating) => {
    switch (challengeRating) {
      case 0:
      case 0.125:
      case 0.25:
      case 0.5:
      case 1:
      case 2:
      case 3:
      case 4:
        return 2;
      case 5:
      case 6:
      case 7:
      case 8:
        return 3;
      case 9:
      case 10:
      case 11:
      case 12:
        return 4;
      case 13:
      case 14:
      case 15:
      case 16:
        return 5;
      case 17:
      case 18:
      case 19:
      case 20:
        return 6;
      case 21:
      case 22:
      case 23:
      case 24:
        return 7;
      case 25:
      case 26:
      case 27:
      case 28:
        return 8;
      case 29:
      case 30:
        return 9;
    }
  };

  //Initialization of monster data
  if (props.monster) {
    //load proficiences
    savingThrows.push(
      {
        name: "STR",
        value: Math.floor((props.monster.stats.strength - 10) / 2),
      },
      {
        name: "DEX",
        value: Math.floor((props.monster.stats.dexterity - 10) / 2),
      },
      {
        name: "CON",
        value: Math.floor((props.monster.stats.constitution - 10) / 2),
      },
      {
        name: "INT",
        value: Math.floor((props.monster.stats.intelligence - 10) / 2),
      },
      { name: "WIS", value: Math.floor((props.monster.stats.wisdom - 10) / 2) },
      {
        name: "CHA",
        value: Math.floor((props.monster.stats.charisma - 10) / 2),
      }
    );

    props.monster.saving_throws.forEach((element) => {
      let index = savingThrows.findIndex((item) => item.name === element);
      savingThrows[index].value += getProficiencyBonus(
        parseInt(props.monster.challenge_rating)
      );
    });

    props.monster.proficiencies.forEach((element) => {
      skills.push({
        name: element.name,
        value: element.value,
      });
    });

    //load damage vulnerabilities
    if (props.monster.damage_vulnerabilities !== undefined) {
      props.monster.damage_vulnerabilities.forEach((item) => {
        damageVulnerabilties.push(item);
      });
    }
    //load damage resistances
    if (props.monster.damage_resistances !== undefined) {
      props.monster.damage_resistances.forEach((item) => {
        damageResistances.push(item);
      });
    }
    //load damage immunities
    if (props.monster.damage_immunities !== undefined) {
      props.monster.damage_immunities.forEach((item) => {
        damageImmunities.push(item);
      });
    }
    //load condidtion immunities
    if (props.monster.condition_immunities !== undefined) {
      props.monster.condition_immunities.forEach((item) => {
        condidtionImmunities.push(item);
      });
    }
  }

  return (
    <div>
      <div>Armor Class {props.monster.armor_class}</div>
      <div>
        Hit Points {props.monster.hit_points} ({props.monster.hit_dice_count}
        {props.monster.hit_die}+
        {parseInt(props.monster.hit_dice_count) *
          Math.floor((props.monster.stats.constitution - 10) / 2)}
        )
      </div>
      <div>
        Speed {props.monster.speed}
        <div
          style={{
            display: "flex",
            flexDirection: "row-reverse",
            color: "red",
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
          justifyContent="center"
          alignItems="flex-start"
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
          justifyContent="center"
          alignItems="flex-start"
          spacing={1}
        >
          <Grid item xs={2}>
            {props.monster.stats.strength} (
            <span>{props.monster.stats.strength > 10 ? "+" : ""}</span>
            {Math.floor((props.monster.stats.strength - 10) / 2)})
          </Grid>
          <Grid item xs={2}>
            {props.monster.stats.dexterity} (
            {props.monster.stats.dexterity > 10 ? "+" : ""}
            {Math.floor((props.monster.stats.dexterity - 10) / 2)})
          </Grid>
          <Grid item xs={2}>
            {props.monster.stats.constitution} (
            {props.monster.stats.constitution > 10 ? "+" : ""}
            {Math.floor((props.monster.stats.constitution - 10) / 2)})
          </Grid>
          <Grid item xs={2}>
            {props.monster.stats.intelligence} (
            {props.monster.stats.intelligence > 10 ? "+" : ""}
            {Math.floor((props.monster.stats.intelligence - 10) / 2)})
          </Grid>
          <Grid item xs={2}>
            {props.monster.stats.wisdom} (
            {props.monster.stats.wisdom > 10 ? "+" : ""}
            {Math.floor((props.monster.stats.wisdom - 10) / 2)})
          </Grid>
          <Grid item xs={2}>
            {props.monster.stats.charisma} (
            {props.monster.stats.charisma > 10 ? "+" : ""}
            {Math.floor((props.monster.stats.charisma - 10) / 2)})
          </Grid>
        </Grid>

        {/* saving throws block */}
        {savingThrows.length !== 0 && (
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="flex-start"
            spacing={1}
          >
            {savingThrows.map((savingThrow, index) => (
              <Grid item xs={2}>
                <Typography className={classes.textColor}>
                  {savingThrow.value > 0 ? "+" : ""}
                  {savingThrow.value}
                </Typography>
              </Grid>
            ))}
          </Grid>
        )}
      </div>
      <Divider />

      {/* display skills */}
      <Typography variant="h6"> Traits </Typography>
      <List>
        {skills.length !== 0 && (
          <ListItem dense={true}>
            <Typography variant="body1" className={classes.headingColor}>
              Skills:<span>&nbsp;&nbsp;</span>
            </Typography>
            <div className={classes.proficienciesDesc}>
              {skills.map((prof, index) => (
                <Typography variant="body2" color={"textPrimary"}>
                  {prof.name} +{prof.value}
                  <span>&nbsp;&nbsp;</span>
                </Typography>
              ))}
            </div>
          </ListItem>
        )}

        {/* display damage vulnerabilities */}
        {damageVulnerabilties.length !== 0 && (
          <ListItem dense={true}>
            <Typography variant="body1" className={classes.headingColor}>
              Damage Vuln.:<span>&nbsp;&nbsp;</span>
            </Typography>
            <div className={classes.proficienciesDesc}>
              {damageVulnerabilties.map((vulnerabilties, index) => (
                <Typography variant="body2">
                  <span>&nbsp;</span>
                  {vulnerabilties}
                  {index >= 0 && damageVulnerabilties.length != index + 1
                    ? ", "
                    : " "}
                </Typography>
              ))}
            </div>
          </ListItem>
        )}

        {/* display damage resistance */}
        {damageResistances.length !== 0 && (
          <ListItem dense={true}>
            <Typography variant="body1" className={classes.headingColor}>
              Damage Res.:<span>&nbsp;&nbsp;</span>
            </Typography>
            <div className={classes.proficienciesDesc}>
              {damageResistances.map((resistance, index) => (
                <Typography variant="body2">
                  <span>&nbsp;</span>
                  {resistance}
                  {index >= 0 && damageResistances.length != index + 1
                    ? ", "
                    : ""}
                </Typography>
              ))}
            </div>
          </ListItem>
        )}

        {/* display damage immunities */}
        {damageImmunities.length !== 0 && (
          <ListItem dense={true}>
            <Typography variant="body1" className={classes.headingColor}>
              Damage Immun.:<span>&nbsp;&nbsp;</span>
            </Typography>
            <div className={classes.proficienciesDesc}>
              {damageImmunities.map((immunities, index) => (
                <Typography variant="body2">
                  <span>&nbsp;</span>
                  {immunities}
                  {index >= 0 && damageImmunities.length != index + 1
                    ? ","
                    : ""}
                </Typography>
              ))}
            </div>
          </ListItem>
        )}

        {/* display condition immunities */}
        {condidtionImmunities.length !== 0 && (
          <ListItem dense={true}>
            <Typography variant="body1" className={classes.headingColor}>
              Cond. Immun.:<span>&nbsp;&nbsp;</span>
            </Typography>
            <div className={classes.proficienciesDesc}>
              {condidtionImmunities.map((immunities, index) => (
                <Typography variant="body2">
                  <span>&nbsp;</span>
                  {immunities}
                  {index >= 0 && condidtionImmunities.length != index + 1
                    ? ", "
                    : ""}
                </Typography>
              ))}
            </div>
          </ListItem>
        )}

        {/* display senses */}
        {props.monster.senses.length !== 0 && (
          <ListItem dense={true}>
            <Typography variant="body1" className={classes.headingColor}>
              Senses:<span>&nbsp;&nbsp;</span>
            </Typography>
            <Typography variant="body2">{props.monster.senses}</Typography>
          </ListItem>
        )}

        {/* display languages */}
        {props.monster.senses.length !== 0 && (
          <ListItem dense={true}>
            <Typography variant="body1" className={classes.headingColor}>
              Languages:<span>&nbsp;&nbsp;</span>
            </Typography>
            <Typography variant="body2">{props.monster.languages}</Typography>
          </ListItem>
        )}

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

      {props.monster.special_abilities.length !== 0 && (
        <div>
          <Typography variant="h6">Special Abilities</Typography>
          <List>
            {props.monster.special_abilities.map((item, index) => (
              <ListItem dense={true}>
                <div>
                  <Typography variant="body1" className={classes.headingColor}>
                    {" "}
                    {item.name}{" "}
                  </Typography>
                  <Typography variant="body2"> {item.desc} </Typography>
                </div>
              </ListItem>
            ))}
          </List>
          <Divider />
        </div>
      )}
    </div>
  );
}
