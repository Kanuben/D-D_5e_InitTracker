import { adaptV4Theme, createTheme, StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppDrawer from "../InitiativeTrackerApp/components/AppDrawer";
import ConditionInfo from "../InitiativeTrackerApp/components/ConditionInfo";
import MonsterInfo from "../InitiativeTrackerApp/components/MonsterInfo/MonsterInfo";
import SpellInfo from "../InitiativeTrackerApp/components/SpellInfo";


const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 700,
      md: 800,
      lg: 1100,
      xl: 1536,
    },
  },
  palette: {
    mode: 'dark',
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
    // h3: {
    //   fontFamily: 'MedievalSharp',
    // },
  },
});

export default function App() {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <AppDrawer></AppDrawer>
        <Routes>
          <Route exact path="/monster/:id" component={MonsterInfo}>
          </Route>
          <Route exact path="/spell/:id" component={SpellInfo}>
          </Route>
          <Route exact path="/condition/:id" component={ConditionInfo}>
          </Route>
        </Routes>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
