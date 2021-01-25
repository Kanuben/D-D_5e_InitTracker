import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Grow from '@material-ui/core/Grow';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import SvgIcon from '@material-ui/core/SvgIcon';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import PeopleIcon from '@material-ui/icons/People';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import clsx from 'clsx';
import React from 'react';
import {ReactComponent as Dragon} from '../assets/dragon.svg';
import loadFile from '../services/FileService';
import InitiativeTracker from './InitiativeTracker';
import AddCharacter from './Modals/AddCharacter';

const drawerWidth = 240;

const useStyles = makeStyles (theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create (['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create (['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing (2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing (0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing (3),
    transition: theme.transitions.create ('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create ('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  placeholder: {
    display: 'flex',
    'justify-content': 'center',
    'align-items': 'center',
    height: '80vh',
    'flex-direction': 'column',
  },
}));

export default function PersistentDrawerLeft () {
  const classes = useStyles ();
  const theme = useTheme ();
  const [open, setOpen] = React.useState (false);
  const [characterList, setCharacterList] = React.useState ([]);

  const handleDrawerOpen = () => {
    setOpen (true);
  };

  const handleDrawerClose = () => {
    setOpen (false);
  };

  const handleRemove = character => {
    const newList = characterList.filter (item => item !== character);
    setCharacterList (newList);
  };

  const handleInitAdvance = () => {
    let newList = Object.create (characterList);
    newList.push (newList.shift ());
    setCharacterList (newList);
  };

  const handleLoad = () => {
    loadFile (result => {
      result.sort (function (a, b) {
        return b.initiative - a.initiative;
      });
      setCharacterList (result);
    });
  };



  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx (classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx (classes.menuButton, open && classes.hide)}
          >
            <MenuOpenIcon style={{fontSize: 40}} />
          </IconButton>
          <Typography variant="h6" noWrap>
            Initiative Tracker
          </Typography>
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
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr'
              ? <ChevronLeftIcon />
              : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {['Load Party'].map ((text, index) => (
            <ListItem button key={text} onClick={handleLoad}>
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
          <input type="file" id="my_file" style={{display: 'none'}} />
        </List>
        <List>

          <AddCharacter charList={characterList}/>

        </List>
        <Divider />
        <List>
          {['Bestiary'].map (text => (
            <ListItem button key={text}>
              <ListItemIcon>{<MenuBookIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main
        className={clsx (classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        {characterList.length != 0 &&
          <InitiativeTracker
            handleRemove={handleRemove}
            handleInitAdvance={handleInitAdvance}
            charList={characterList}
          />}
        {characterList.length == 0 &&
          <div className={classes.placeholder}>
            <Grow in={true}>
              <div>
                <SvgIcon style={{fontSize: 500}} color="action">
                  <Dragon />
                </SvgIcon>
              </div>
            </Grow>
            <div>
              <p style={{fontSize: '2em'}}>
                The inn is empty. Recruit some more adventurers.
              </p>
            </div>
          </div>}
      </main>
    </div>
  );
}
