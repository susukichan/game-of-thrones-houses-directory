import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import NineHouses from "./NineHouses";
import ListOfHouses from "./ListOfHouses";
import SortByRegions from "./SortByRegions";

export function App() {
  return (
    <Router>
      <div
        className="App"
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
        }}
      >
        {/* the route props? */}
        <nav style={{ backgroundColor: "red" }}>
          <h1>nav</h1>
          <Link to="nine-houses">nine-houses</Link>
          <Link to="list-of-houses">list-of-houses</Link>
          <Link to="sort-by-regions">sort-by-regions</Link>
        </nav>
        <main style={{ backgroundColor: "grey", flex: 1 }}>
          <Switch>
            <Route path="/nine-houses">
              <NineHouses />
            </Route>
            <Route path="/list-of-houses">
              {(routeProps) => <ListOfHouses routeProps={routeProps} />}
            </Route>
            <Route path="/sort-by-regions">
              <SortByRegions />
            </Route>
            <Route>
              <h1>not found</h1>
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
}
