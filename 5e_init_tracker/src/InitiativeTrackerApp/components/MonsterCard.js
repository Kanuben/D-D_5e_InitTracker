import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React, { useEffect } from "react";
import { loadMonsterData, loadMonsters } from "../../services/MonsterService";
import { map, mergeMap } from "rxjs/operators";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
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
}));

export default function MonsterCard(props) {
  let strMod = 0;
  let dexMod = 0;
  let conMod = 0;
  let intMod = 0;
  let wisMod = 0;
  let chaMod = 0;
  const classes = useStyles();
  const [monster, setMonster] = React.useState();

  useEffect(() => {
    loadMonsterData(props.match.params.id)
      .pipe(
        map((monster) => {
          setMonster(monster);
        })
      )
      .subscribe();
  }, props);

  if (monster) {
    strMod = Math.floor((monster.strength - 10) / 2);
    dexMod = Math.floor((monster.dexterity - 10) / 2);
    conMod = Math.floor((monster.constitution - 10) / 2);
    intMod = Math.floor((monster.intelligence - 10) / 2);
    wisMod = Math.floor((monster.wisdom - 10) / 2);
    chaMod = Math.floor((monster.charisma - 10) / 2);
  }

  return (
    <Card className={classes.cardwidth}>
      <CardContent>
        {monster && (
          <div>
            <Typography variant="h4" gutterBottom>
              {monster.name}
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
              {monster.size} {monster.type}, {monster.alignment}
            </Typography>
            <Divider />
            <div>Armor Class {monster.armor_class}</div>
            <div>
              Hit Points {monster.hit_points} ({monster.hit_dice}+
              {parseInt(monster.hit_dice) * conMod})
            </div>
            <div>
              Speed {monster.speed.walk} swim {monster.speed.swim}
            </div>
            <Divider />
            <div>STR DEX CON INT WIS CHA</div>
            <div>
              {monster.strength} ({strMod}){monster.dexterity} ({dexMod})
              {monster.constitution} ({conMod}){monster.intelligence} ({intMod})
              {monster.wisdom} ({wisMod}){monster.charisma} ({chaMod})
            </div>
            <Divider />
            {monster.proficiencies.map((prof, index) => (
              <ListItem>
                {prof.proficiency.name} +{prof.value}
              </ListItem>
            ))}
            <ListItem>Senses Darkvision {monster.senses.darkvision} Passive Perception {monster.senses.passive_perception}</ListItem>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
