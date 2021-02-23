import AppDrawer from "./InitiativeTrackerApp/components/AppDrawer";
import { Link, Route, Switch } from "react-router-dom";
import MonsterInfo from "./InitiativeTrackerApp/components/MonsterInfo";
import SpellCard from "./InitiativeTrackerApp/components/SpellCard";

export default function App() {
  return (
    <div>
      <Route exact path="/">
        <AppDrawer />
      </Route>
      <Route exact path="/monster/:id"  component={MonsterInfo}>
      </Route>
      <Route exact path="/spell/:id"  component={SpellCard}>
      </Route>
    </div>
  );
}
