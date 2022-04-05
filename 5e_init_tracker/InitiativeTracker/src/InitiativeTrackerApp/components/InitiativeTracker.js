import DeleteIcon from "@mui/icons-material/Delete";
import Grid from "@mui/material/Grid";
import Grow from "@mui/material/Grow";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Slide from "@mui/material/Slide";
import { useTheme } from "@mui/material/styles";
import makeStyles from "@mui/styles/makeStyles";
import { default as React, useEffect } from "react";
import CharacterCard from "./CharacterCard";
import MonsterInfo from "./MonsterInfo/MonsterInfo";
import useMediaQuery from "@mui/material/useMediaQuery";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    width: "100%",
    "justify-content": "flex-end",
    "z-index": 1000,
    background: theme.palette.secondary.main,
  },
}));

export default function InitiativeTracker(props) {
  const classes = useStyles();
  const theme = useTheme();

  const matches = useMediaQuery(theme.breakpoints.up("lg"));
  return (
    <div>
      <div>
        {/* If charList is defined display the list */}
        {props.charList && (
          <Grid container spacing={3}>
            <Grid item xs>
              <List>
                {props.charList.map((character) => (
                  <Slide direction="up" in={true} mountOnEnter>
                    <ListItem key={character.id}>
                      <CharacterCard
                        character={character}
                        charList={props.charList}
                        setInitiativeList={props.setInitiativeList}
                        sortInitList={props.sortInitList}
                        selectedCharacter={props.selectedCharacter}
                        setSelectedCharacter={props.setSelectedCharacter}
                      />
                      <IconButton
                        onClick={() => {
                          props.handleRemove(character);
                        }}
                        aria-label="delete"
                        size="large"
                      >
                        <DeleteIcon fontSize="large" />
                      </IconButton>
                    </ListItem>
                  </Slide>
                ))}
              </List>
            </Grid>
            {props.showMonsterInfo ||
              props.selectedCharacter.isPlayer == false && matches == true && (
                  <Grid item xs={4}>
                    <div style={{ paddingTop: "1em", paddingRight: "2em", position: "fixed" }}>
                      <MonsterInfo
                        monster={props.selectedCharacter}
                      ></MonsterInfo>
                    </div>
                  </Grid>
              )}
          </Grid>
        )}
      </div>
    </div>
  );
}
