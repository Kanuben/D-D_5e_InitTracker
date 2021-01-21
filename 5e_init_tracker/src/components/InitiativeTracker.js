import { Toolbar } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import SvgIcon from "@material-ui/core/SvgIcon";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import DeleteIcon from "@material-ui/icons/Delete";
import React from "react";
import { ReactComponent as Logo } from "../assets/download.svg";
import CharacterCard from "./CharacterCard";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    "justify-content": "flex-end",
    "padding-right": "5em",
  },
}));

function InitiativeTracker(props) {
  const classes = useStyles();
  const theme = useTheme();

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
      {/* If charList is defined display the list */}
      {props.charList && (
        <List>
          {props.charList.map((character, index) => (
            <ListItem>
              <CharacterCard {...character} index={index}></CharacterCard>
              <IconButton
                onClick={() => {
                  props.handleRemove(character.id);
                }}
                aria-label="delete"
              >
                <DeleteIcon fontSize="large" />
              </IconButton>
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
}

export default InitiativeTracker;
