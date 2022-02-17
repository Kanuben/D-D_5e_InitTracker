import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CreateIcon from "@mui/icons-material/Create";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PublishIcon from "@mui/icons-material/Publish";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import Grow from "@mui/material/Grow";
import IconButton from "@mui/material/IconButton";
import LinearProgress from "@mui/material/LinearProgress";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useTheme } from "@mui/material/styles";
import SvgIcon from "@mui/material/SvgIcon";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import makeStyles from '@mui/styles/makeStyles';
import clsx from "clsx";
import { isEqual } from 'lodash';
import PropTypes from "prop-types";
import { default as React, useEffect } from "react";
import { forkJoin } from "rxjs";
import { map } from "rxjs/operators";
import loadFile from "../../services/FileService";
import { loadMonsterData, loadMonsters } from "../../services/MonsterService";
import { ReactComponent as Logo } from "../assets/download.svg";
import { ReactComponent as Dragon } from "../assets/dragon.svg";
import {
  monsterFileExists,
  readMonsterFile, translateMonsters,
  writeMonsterFile
} from "../utilities/MonsterTranslator";
import InitiativeTracker from "./InitiativeTracker";
import AddCharacter from "./Modals/AddCharacter";
import AddMonster from "./Modals/AddMonster";
import CreateChar from "./Modals/CreateChar";
import CreateMonster from "./Modals/CreateMonster";
import EmptyReminder from "./Modals/EmptyReminder";


function LinearProgressWithLabel(props) {
  return (
    <Box display="flex" alignItems="center">
      <Box width="100%" mr={1}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box minWidth={35}>
        <Typography variant="body2" color="textSecondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate and buffer variants.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired,
};

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    background: theme.palette.primary.main,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
    justifyContent: 'space-around',

  },
  mainToolbar: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  placeholder: {
    display: "flex",
    "justify-content": "center",
    "align-items": "center",
    height: "80vh",
    "flex-direction": "column",
  },

}));

export default function PersistentDrawerLeft() {
  const classes = useStyles();
  const theme = useTheme();
  const [appLoaded, setLoaded] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [openAddCharacter, setOpenAddCharacter] = React.useState(false);

  const [openCreateCharacter, setOpenCreateCharacter] = React.useState(false);
  const [openCreateMonster, setOpenCreateMonster] = React.useState(false);

  const [openAddMonster, setOpenAddMonster] = React.useState(false);
  const [openEmptyReminder, setOpenEmptyReminder] = React.useState(false);
  const [characterList, setCharacterList] = React.useState([]);
  const [monsterList, setMonsterList] = React.useState([]);
  const [spellList, setSpellList] = React.useState([]);
  const [initiativeList, setInitiativeList] = React.useState([]);
  const [selectedCharacter, setSelectedCharacter] = React.useState({});
  const [monsterProgress, setMonsterProgress] = React.useState(0);
  const [spellProgress, setSpellProgress] = React.useState(0);

  useEffect(() => {
    let tasks = [];
    if (monsterFileExists() === false) {
      tasks.push(getAllMonster());
      forkJoin(tasks).subscribe(
        (tasksResult) => {
          forkJoin(tasksResult.flat()).subscribe(
            (data) => {
              let monsterArr = [];
              let spellArr = [];
              data.forEach((item) => {
                monsterArr.push(item);
              });
              handleAppendMonsterList(translateMonsters(monsterArr));
              setLoaded(true);
            },
            (err) => {
              alert(err);
              setLoaded(true);
            }
          );
        },
        (err) => {
          alert("Failed to load monsters from api" + err.message);
          setLoaded(true);
        }
      );
    } else {
      setMonsterList(readMonsterFile());
      setLoaded(true);

    }
  }, []);

  const getAllMonster = () => {
    return loadMonsters().pipe(
      map((monsterList) => {
        let count = 0;
        return monsterList.results.map((monster) => {
          return loadMonsterData(monster.index).pipe(
            map((monster) => {
              handleIncrementMonsterProgress(monsterList.count, count);
              count++;
              monster.type = capitalize(monster.type);
              return monster;
            })
          );
        });
      })
    );
  };

  // const getAllSpells = () => {
  //   return loadSpells().pipe(
  //     map((spellList) => {
  //       let count = 0;
  //       return spellList.results.map((spell) => {
  //         return loadSpellData(spell.index).pipe(
  //           map((spell) => {
  //             handleIncrementSpellProgress(spellList.count, count);
  //             count++;
  //             return spell;
  //           })
  //         );
  //       });
  //     })
  //   );
  // };

  const handleSetInitList = (newList) => {
    setSelectedCharacter(newList[0]);
    setInitiativeList(newList);
  }

  const handleAppendMonsterList = (appendList) => {
    let newList = [];
    Object.assign(newList, monsterList);
    appendList.forEach((monster) => {
      monster.initiative = 0;
      monster.isPlayer = false;
      monster.statuses = [];
      monster.damage = 0;
      if (newList.filter(e => isEqual(e, monster)).length === 0) {
        newList.push(monster);
      }
    });
    writeMonsterFile(newList);
    setMonsterList(newList);
  };

  const handleAppendCharacterList = (appendList) => {
    let newList = [];
    Object.assign(newList, characterList);
    appendList.forEach((character) => {
      character.initiative = 0;
      if (newList.filter(e => isEqual(e, character)).length === 0) {
        newList.push(character);
      }
    });
    setCharacterList(newList);
  };

  const handleIncrementMonsterProgress = (size, position) => {
    setMonsterProgress((position / size) * 100);
  };

  const handleIncrementSpellProgress = (size, position) => {
    setSpellProgress((position / size) * 100);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleAddCharacterClick = () => {
    if (characterList.length === 0) {
      handleEmptyReminderOpen();
    } else {
      handleAddCharacterOpen();
    }
  };

  const handleAddMonsterClick = () => {
    if (monsterList.length === 0) {
      handleEmptyReminderOpen();
    } else {
      handleAddMonsterOpen();
    }
  };

  const handleAddCharacterOpen = () => {
    setOpenAddCharacter(true);
  };

  const handleAddCharacterClose = () => {
    setOpenAddCharacter(false);
  };

  const handleCreateCharacterOpen = () => {
    setOpenCreateCharacter(true);
  };

  const handleCreateCharacterClose = () => {
    setOpenCreateCharacter(false);
  };

  const handleCreateMonsterOpen = () => {
    setOpenCreateMonster(true);
  };

  const handleCreateMonsterClose = () => {
    setOpenCreateMonster(false);
  };

  const handleAddMonsterOpen = () => {
    setOpenAddMonster(true);
  };

  const handleAddMonsterClose = () => {
    setOpenAddMonster(false);
  };

  const handleEmptyReminderOpen = () => {
    setOpenEmptyReminder(true);
  };

  const handleEmptyReminderClose = () => {
    setOpenEmptyReminder(false);
  };

  const handleRemove = (character) => {
    const newList = initiativeList.filter((item) => item.id !== character.id);
    setInitiativeList(newList);
    setSelectedCharacter(newList[0]);
  };

  const handleInitAdvance = () => {
    let newList = [];
    Object.assign(newList, initiativeList);
    newList.push(newList.shift());
    setInitiativeList(newList);
    setSelectedCharacter(newList[0]);
  };

  const handleRollInit = () => {
    let newList = [];
    initiativeList.map((character) => {
      let mod = 0;
      let d20 = 0;
      if (character.initBonus !== undefined) {
        mod = character.initBonus;
      } else {
        mod = Math.floor((character.stats.dexterity - 10) / 2);
      }
      d20 = Math.floor(Math.random() * 20) + 1;
      character.initiative = d20 + mod;

      let tempChar = {};
      Object.assign(tempChar, character);

      newList.push(tempChar);
    });
    sortInitList(newList);
    setInitiativeList(newList);
    setSelectedCharacter(newList[0]);
  };

  const sortInitList = (list) => {
    list.sort(function (a, b) {
      return b.initiative - a.initiative;
    });
  };

  const handleLoadFile = () => {
    loadFile((result) => {
      let monsterArr = [];
      let charArr = [];
      result.forEach((item) => {
        if (item.isPlayer === false) {
          monsterArr.push(item);
        } else {
          charArr.push(item);
        }
      });
      handleAppendMonsterList(monsterArr);
      handleAppendCharacterList(charArr);
    });
  };

  const capitalize = (s) => {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <Button
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
            size="large"
            endIcon={<MenuOpenIcon style={{ fontSize: 40 }} />}>
          </Button>
          <div className={classes.mainToolbar}>
            <div>
              <Typography variant="h4" noWrap>
                Goblin Tracker
              </Typography>
            </div>
            <div>
              <Button
                color="inherit"
                onClick={() => {
                  handleRollInit();
                }}
                size="large"
                endIcon={<SvgIcon style={{ fontSize: 40 }}>
                  <Logo />
                </SvgIcon>}
              >
                Roll
              </Button>
              <Button
                color="inherit"
                onClick={() => {
                  handleInitAdvance();
                }}
                aria-label="advance"
                size="large"
                endIcon={<ArrowUpwardIcon style={{ fontSize: 40 }} ></ArrowUpwardIcon>}
              >
                Advance
              </Button>
            </div>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <Typography variant="h6" noWrap>
            Main Menu
          </Typography>
          <IconButton onClick={handleDrawerClose} size="large">
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          {["Import Characters"].map((text, index) => (
            <ListItem button key={text} onClick={handleLoadFile}>
              <ListItemIcon>
                <PublishIcon />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
          <input type="file" id="my_file" style={{ display: "none" }} />
        </List>
        <Divider variant="middle" />
        <List>
          <ListItem
            button
            key={"Create Character"}
            onClick={handleCreateCharacterOpen}
          >
            <ListItemIcon>
              <CreateIcon />
            </ListItemIcon>
            <ListItemText primary={"Create Character"} />
          </ListItem>

          <ListItem
            button
            key={"Add Character"}
            onClick={handleAddCharacterClick}
          >
            <ListItemIcon>
              <PersonAddIcon />
            </ListItemIcon>
            <ListItemText primary={"Add Character"} />
          </ListItem>
          <Divider variant="middle" />
          <List>
            <ListItem
              button
              key={"Create Character"}
              onClick={handleCreateMonsterOpen}
            >
              <ListItemIcon>
                <CreateIcon />
              </ListItemIcon>
              <ListItemText primary={"Create Monster"} />
            </ListItem>

            <ListItem
              button
              key={"Add Monster"}
              onClick={handleAddMonsterClick}
            >
              <ListItemIcon>
                <PersonAddIcon />
              </ListItemIcon>
              <ListItemText primary={"Add Monster"} />
            </ListItem>
          </List>
          <AddMonster
            openAddMonster={openAddMonster}
            onClose={handleAddMonsterClose}
            handleSetInitList={handleSetInitList}
            initList={initiativeList}
            monList={monsterList}
          />

          <AddCharacter
            openAddCharacter={openAddCharacter}
            onClose={handleAddCharacterClose}
            handleSetInitList={handleSetInitList}
            initList={initiativeList}
            charList={characterList.filter((char) => char.isPlayer === true)}
          />
          <EmptyReminder
            openEmptyReminder={openEmptyReminder}
            onClose={handleEmptyReminderClose}
          />
          <CreateChar
            onClose={handleCreateCharacterClose}
            openCreateCharacter={openCreateCharacter}
            handleAppendCharacterList={handleAppendCharacterList}
          />
          <CreateMonster
            onClose={handleCreateMonsterClose}
            openCreateMonster={openCreateMonster}
            handleAppendMonsterList={handleAppendMonsterList}
            monsterList={monsterList}
          />
        </List>
        <Divider />
        <List>
          {["Bestiary"].map((text) => (
            <ListItem button key={text}>
              <ListItemIcon>{<MenuBookIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        {appLoaded === false && (
          <div>
            Loading Monsters...
            <LinearProgressWithLabel value={monsterProgress} />
            Loading Spells...
            <LinearProgressWithLabel value={spellProgress} />
          </div>
        )}
        {appLoaded === true && (
          <div>
            {initiativeList.length !== 0 && (
              <Box>
                <InitiativeTracker
                  handleRemove={handleRemove}
                  handleInitAdvance={handleInitAdvance}
                  charList={initiativeList}
                  handleRollInit={handleRollInit}
                  sortInitList={sortInitList}
                  setInitiativeList={setInitiativeList}
                  selectedCharacter={selectedCharacter}
                  setSelectedCharacter={setSelectedCharacter}
                />
              </Box>
            )}
            {initiativeList.length === 0 && (
              <div className={classes.placeholder}>
                <Grow in={true}>
                  <div>
                    <SvgIcon
                      style={{ width: "65vw", height: "65vh" }}
                      color="action"
                    >
                      <Dragon />
                    </SvgIcon>
                  </div>
                </Grow>
                <div>
                  <p style={{ fontSize: "2em" }}>
                    The inn is empty. Recruit some more adventurers.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
