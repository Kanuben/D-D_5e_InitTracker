import { Toolbar } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import SvgIcon from "@material-ui/core/SvgIcon";
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import DeleteIcon from "@material-ui/icons/Delete";
import React from "react";
import { ReactComponent as Logo } from "../assets/download.svg";
import CharacterCard from "./CharacterCard";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    'justify-content': 'flex-end',
    'padding-right': '5em',
  },
}));

function InitiativeTracker() {
  const classes = useStyles();
  const theme = useTheme();

  const [characterList, setCharList] = React.useState([
    {
      id: 0,
      isPlayer: false,
      img:
        "https://c1.scryfall.com/file/scryfall-cards/art_crop/front/5/2/52e7c608-d224-472b-8736-273874211f24.jpg?1562912268",
      name: "Leige of the Pit",
      role: "Demon",
      level: 69,
      status: "Ballin",
      ac: 99,
      damage: 0,
      initiative: 20,
      initBonus: 3,
    },
    {
      id: 1,
      isPlayer: true,
      img:
        "https://9b16f79ca967fd0708d1-2713572fef44aa49ec323e813b06d2d9.ssl.cf2.rackcdn.com/300x_a1-1_cTC/6r800k6d-JPG-1579105478.jpg",
      name: "Jimbo Jones",
      role: "Rouge Plumber",
      level: 3,
      status: ["Redneck", "Camoflauge"],
      ac: 3,
      damage: 0,
      initiative: 12,
      initBonus: 0,
    },
    {
      id: 0,
      isPlayer: false,
      img:
        "https://c1.scryfall.com/file/scryfall-cards/art_crop/front/5/2/52e7c608-d224-472b-8736-273874211f24.jpg?1562912268",
      name: "Leige of the Pit",
      role: "Demon",
      level: 69,
      status: "Ballin",
      ac: 99,
      damage: 0,
      initiative: 20,
      initBonus: 3,
    },
    {
      id: 1,
      isPlayer: true,
      img:
        "https://9b16f79ca967fd0708d1-2713572fef44aa49ec323e813b06d2d9.ssl.cf2.rackcdn.com/300x_a1-1_cTC/6r800k6d-JPG-1579105478.jpg",
      name: "Jimbo Jones",
      role: "Rouge Plumber",
      level: 3,
      status: ["Redneck", "Camoflauge"],
      ac: 3,
      damage: 0,
      initiative: 12,
      initBonus: 0,
    },
    {
      id: 0,
      isPlayer: false,
      img:
        "https://c1.scryfall.com/file/scryfall-cards/art_crop/front/5/2/52e7c608-d224-472b-8736-273874211f24.jpg?1562912268",
      name: "Leige of the Pit",
      role: "Demon",
      level: 69,
      status: "Ballin",
      ac: 99,
      damage: 0,
      initiative: 20,
      initBonus: 3,
    },
    {
      id: 1,
      isPlayer: true,
      img:
        "https://9b16f79ca967fd0708d1-2713572fef44aa49ec323e813b06d2d9.ssl.cf2.rackcdn.com/300x_a1-1_cTC/6r800k6d-JPG-1579105478.jpg",
      name: "Jimbo Jones",
      role: "Rouge Plumber",
      level: 3,
      status: ["Redneck", "Camoflauge"],
      ac: 3,
      damage: 0,
      initiative: 12,
      initBonus: 0,
    },
    {
      id: 0,
      isPlayer: false,
      img:
        "https://c1.scryfall.com/file/scryfall-cards/art_crop/front/5/2/52e7c608-d224-472b-8736-273874211f24.jpg?1562912268",
      name: "Leige of the Pit",
      role: "Demon",
      level: 69,
      status: "Ballin",
      ac: 99,
      damage: 0,
      initiative: 20,
      initBonus: 3,
    },
    {
      id: 1,
      isPlayer: true,
      img:
        "https://9b16f79ca967fd0708d1-2713572fef44aa49ec323e813b06d2d9.ssl.cf2.rackcdn.com/300x_a1-1_cTC/6r800k6d-JPG-1579105478.jpg",
      name: "Jimbo Jones",
      role: "Rouge Plumber",
      level: 3,
      status: ["Redneck", "Camoflauge"],
      ac: 3,
      damage: 0,
      initiative: 12,
      initBonus: 0,
    },
  ]);

  function handleRemove(id) {
    const newList = characterList.filter((item) => item.id !== id);
    setCharList(newList);
  }

  return (
    <div>
      <Toolbar className={classes.toolbar}>
        <div>
          <IconButton aria-label="delete">
          <SvgIcon style={{ fontSize: 40 }} color="action">
              <Logo />
            </SvgIcon>
          </IconButton>
        </div>
        <div>
          <IconButton aria-label="advance">
            <ArrowUpwardIcon style={{ fontSize: 40 }} />
          </IconButton>
        </div>
      </Toolbar>
      <List>
        {characterList.map((character, index) => (
          <ListItem>
            <CharacterCard {...character} index={index}></CharacterCard>
            <IconButton
              onClick={() => handleRemove(character.id)}
              aria-label="delete"
            >
              <DeleteIcon fontSize="large" />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default InitiativeTracker;
