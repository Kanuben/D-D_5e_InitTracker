import AppDrawer from "./InitiativeTrackerApp/components/AppDrawer";
import { Link, Route, Switch } from "react-router-dom";
import MonsterCard from "./InitiativeTrackerApp/components/MonsterCard";

export default function App() {
  return (
    <div>
      <Route path="/home">
        <AppDrawer />
      </Route>
      <Route exact path="/monster/:id"  component={MonsterCard}>
      </Route>
    </div>
  );
}
