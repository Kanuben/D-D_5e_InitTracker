import { Card, CardContent, ListItem } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Slide from "@mui/material/Slide";
import makeStyles from '@mui/styles/makeStyles';
import SvgIcon from "@mui/material/SvgIcon";
import TextField from "@mui/material/TextField";
import Autocomplete from '@mui/material/Autocomplete';
import React, { useEffect } from "react";
import SpellCard from "./SpellCard";
import { loadSpellData } from "../../services/SpellService";
import { grey } from "@mui/material/colors";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from '@mui/material/IconButton';

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
  card: {
    backgroundColor: grey[800]
  }
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

  useEffect(() => {
    setSelectedList(props.selectedSpells)
  }, [props.selectedSpells]);

  const classes = useStyles();

  const handleSelectedSpell = (e, val) => {
    setSelectedSpell(val);
  };

  const addToSelectedList = (selectedSpell) => {
    props.handleFormDirty(true);
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
          id: generateId()
        };
        tempList.push(tempSpell);
        setSelectedList(tempList);
        props.setSelectedSpells(tempList.flat());
      });
    } else {
      return;
    }
  };

  const removeFromSelectedList = (character) => {
    props.handleFormDirty(true);
    const newList = selectedList.filter((item) => item !== character);
    setSelectedList(newList);
  };

  function generateId() {
    let tempId = parseInt(id.substring(1));
    props.spells.forEach((spell) => {
      let spellId = 0
      if (spell.id)
        spellId = parseInt(spell.id.substring(1));
      if (spellId > tempId) {
        tempId = parseInt(spell.id.substring(1));
      }
    });
    tempId++;
    setId("s" + tempId);
    return "s" + tempId;
  }

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
          renderOption={(props, option, { selected }) => (
            <li {...props}>
              <Avatar>
              </Avatar>
              <span style={{ padding: "1em" }}>{option.name}</span>
            </li>
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
          color="secondary"
          sx={{ width: 100 }}
        >
          Add
        </Button>
      </div>
      {selectedList.length === 0 && <div className={classes.placeholder}></div>}
      {selectedList.length !== 0 && (
        <Card className={classes.card}>
          <CardContent className={classes.spellList}>
            <List>
              {selectedList.map((spell, index) => (
                <Slide direction="up" in={true} mountOnEnter>
                  <ListItem>
                    <SpellCard
                      spell={spell}
                      index={index}
                      selected={true}
                      removeFromSelectedList={removeFromSelectedList}
                    />
                    <IconButton
                      onClick={() => {
                        removeFromSelectedList(spell);
                      }}
                      aria-label="delete"
                      size="large">
                      <DeleteIcon fontSize="large" />
                    </IconButton>
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
