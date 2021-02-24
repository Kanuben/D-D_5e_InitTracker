import AppDrawer from "./InitiativeTrackerApp/components/AppDrawer";
import { Link, Route, Switch } from "react-router-dom";
import MonsterInfo from "./InitiativeTrackerApp/components/MonsterInfo";
import SpellInfo from "./InitiativeTrackerApp/components/SpellInfo";
import ConditionInfo from "./InitiativeTrackerApp/components/ConditionInfo";

export default function App() {
  return (
    <div>
      <Route exact path="/">
        <AppDrawer />
      </Route>
      <Route exact path="/monster/:id"  component={MonsterInfo}>
      </Route>
      <Route exact path="/spell/:id"  component={SpellInfo}>
      </Route>
      <Route exact path="/condition/:id"  component={ConditionInfo}>
      </Route>
    </div>
  );
}
