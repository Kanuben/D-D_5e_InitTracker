import { Toolbar } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Slide from "@material-ui/core/Slide";
import { makeStyles } from "@material-ui/core/styles";
import SvgIcon from "@material-ui/core/SvgIcon";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import DeleteIcon from "@material-ui/icons/Delete";
import React, { useEffect } from "react";
import { ReactComponent as Logo } from "../assets/download.svg";
import CharacterCard from "./CharacterCard";
import SortIcon from '@material-ui/icons/Sort';

const useStyles = makeStyles(() => ({
  toolbar: {
    "justify-content": "flex-end",
    "padding-right": "5em",
  },
}));

export default function InitiativeTracker(props) {
  const classes = useStyles();

  useEffect(() => {
    console.log(props.charList);

  }, props);

  return (
    <div>
      <Toolbar className={classes.toolbar}>
      <div>
          <IconButton
            aria-label="delete"
            onClick={() => {
              let newList = [];
              Object.assign(newList, props.charList);
              props.sortInitList(newList);
              props.setInitiativeList(newList);
            }}
          >
          <SortIcon/>
          </IconButton>
        </div>
        <div>
          <IconButton
            aria-label="delete"
            onClick={() => {
              props.handleRollInit();
            }}
          >
            <SvgIcon style={{ fontSize: 40 }} color="action">
              <Logo />
            </SvgIcon>
          </IconButton>
        </div>
        <div>
          <IconButton
            onClick={() => {
              props.handleInitAdvance();
            }}
            aria-label="advance"
          >
            <ArrowUpwardIcon style={{ fontSize: 40 }} />
          </IconButton>
        </div>
      </Toolbar>
      {/* If charList is defined display the list */}
      {props.charList && (
        <List>
          {props.charList.map((character) => (
            <Slide direction="up" in={true} mountOnEnter>
              <ListItem key={character.id}>
                <CharacterCard
                  character = {character}
                  charList={props.charList}
                  setInitiativeList={props.setInitiativeList}
                  sortInitList={props.sortInitList}
                />
                <IconButton
                  onClick={() => {
                    props.handleRemove(character);
                  }}
                  aria-label="delete"
                >
                  <DeleteIcon fontSize="large" />
                </IconButton>
              </ListItem>
            </Slide>
          ))}
        </List>
      )}
    </div>
  );
}
