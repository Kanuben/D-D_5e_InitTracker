import AppDrawer from "./InitiativeTrackerApp/components/AppDrawer";
import { Link, Route, Switch } from "react-router-dom";
import MonsterInfo from "./InitiativeTrackerApp/components/MonsterInfo";
import SpellInfo from "./InitiativeTrackerApp/components/SpellInfo";
import ConditionInfo from "./InitiativeTrackerApp/components/ConditionInfo";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';


const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#b53f3f',
    },
    secondary: {
      main: '#8d99ae',
      light: '#bcc6d6',
    },
    spell: {
      main: '#65A4AB'
    }
  },
  typography: {
    // h4: {
    //   fontFamily: 'New Rocker',
    // },
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <Route exact path="/">
          <AppDrawer />
        </Route>
        <Route exact path="/monster/:id" component={MonsterInfo}>
        </Route>
        <Route exact path="/spell/:id" component={SpellInfo}>
        </Route>
        <Route exact path="/condition/:id" component={ConditionInfo}>
        </Route>
      </div>
    </ThemeProvider>
  );
}
