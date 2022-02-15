import { Card, CardContent, ListItem } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Slide from "@material-ui/core/Slide";
import { makeStyles } from "@material-ui/core/styles";
import SvgIcon from "@material-ui/core/SvgIcon";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import React from "react";
import SpellCard from "./SpellCard";
import { loadSpellData } from "../../services/SpellService";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  flex: {
    display: "flex",
    justifyContent: "space-between",
  },
  placeholder: {
    display: "flex",
    "justify-content": "center",
    "align-items": "center",
    "flex-direction": "column",
  },
  spellList: {
    maxHeight: "300px",
    overflow: "auto",
  },
}));

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
});

export default function AddSpell(props) {
  const [selectedSpell, setSelectedSpell] = React.useState({});
  const [selectedList, setSelectedList] = React.useState([]);
  const [id, setId] = React.useState("s0");

  const classes = useStyles();

  const handleSelectedSpell = (e, val) => {
    setSelectedSpell(val);
  };

  //   const addCharacters = () => {
  //     let newList = [];
  //     Object.assign(newList, props.initList);
  //     newList.push(...selectedList);
  //     props.setInitiativeList(newList);
  //     setSelectedList([]);
  //     setId("c0");
  //     handleClose();
  //   };

  const addToSelectedList = (selectedSpell) => {
    let tempList = Object.create(selectedList);
    let filteredSpellList = [];
    filteredSpellList = props.spells.filter(
      (spell) => spell === selectedSpell
    );
    if (filteredSpellList.length !== 0) {
      let tempSpell = {};
      Object.assign(tempSpell, ...filteredSpellList);
      loadSpellData(tempSpell.index).subscribe(spellData => {
        tempSpell = {
          name: spellData.name,
          level: spellData.level,
          url: spellData.url,
        };
        tempList.push(tempSpell);
        setSelectedList(tempList);
        props.setSelectedSpells(tempList.flat());
      });
    } else {
      return;
    }
  };

  //   const removeFromSelectedList = (character) => {
  //     const newList = selectedList.filter((item) => item !== character);
  //     setSelectedList(newList);
  //   };

  // function generateId() {
  //   let tempId = parseInt(id.substring(1));
  //   props.initList.forEach((char) => {
  //     let charId = parseInt(char.id.substring(1));
  //     if (charId > tempId) {
  //       tempId = parseInt(char.id.substring(1));
  //     }
  //   });
  //   tempId++;
  //   setId("s" + tempId);
  //   return "s" + tempId;
  // }

  return (
    <div>
      <div className={classes.flex}>
        <Autocomplete
          id="combo-box-demo"
          freeSolo
          disableClearable
          options={props.spells}
          getOptionLabel={(spell) => spell.name}
          onChange={handleSelectedSpell}
          renderOption={(spell) => (
            <React.Fragment>
              <Avatar />
              <span style={{ padding: "1em" }}>{spell.name}</span>
            </React.Fragment>
          )}
          style={{ width: "85%" }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Spells"
              variant="outlined"
              InputProps={{ ...params.InputProps, type: "search" }}
            />
          )}
        />
        <Button
          onClick={() => {
            addToSelectedList(selectedSpell);
          }}
          autoFocus
          color="primary"
          variant="contained"
        >
          Add To List
        </Button>
      </div>
      {selectedList.length === 0 && <div className={classes.placeholder}></div>}
      {selectedList.length !== 0 && (
        <Card>
          <CardContent className={classes.spellList}>
            <List>
              {selectedList.map((spell, index) => (
                <Slide direction="up" in={true} mountOnEnter>
                  <ListItem>
                    <SpellCard
                      spell={spell}
                      index={index}
                      selected={true}
                    //removeFromSelectedList={removeFromSelectedList}
                    />
                  </ListItem>
                </Slide>
              ))}
            </List>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
