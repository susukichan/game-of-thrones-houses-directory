import "./App.css";
import { useState } from "react";
import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";
import { NineHouses } from "./NineHouses";
import { ListOfHouses } from "./ListOfHouses";
import { Homepage } from "./Homepage";
import "./components/FontAwesomeIcon/FontAwesomeIcon";

export function App() {
  const [backgroundImage, setBackgoundImage] = useState("url(homepage.jpg)");

  return (
    <Router>
      <div className="App" style={{ backgroundImage: backgroundImage }}>
        <header>
          <h1 className="logo">⚔️</h1>
          <input type="checkbox" id="nav-toggle" className="nav-toggle" />
          <nav>
            <ul>
              <li>
                <Link
                  to="/"
                  onClick={() => setBackgoundImage("url(homepage.jpg)")}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="nine-houses"
                  onClick={() => setBackgoundImage("url(nine-houses.jpg)")}
                >
                  Nine Houses
                </Link>
              </li>
              <li>
                <Link
                  to="list-of-houses"
                  onClick={() => setBackgoundImage("url(list-of-houses.jpg)")}
                >
                  List of Houses
                </Link>
              </li>
            </ul>
          </nav>
          <label htmlFor="nav-toggle" className="nav-toggle-label">
            <span></span>
          </label>
        </header>
        <main className="main" style={{ backgroundImage: backgroundImage }}>
          <Switch>
            <Route path="/nine-houses">
              <NineHouses />
            </Route>
            <Route path="/list-of-houses">
              <ListOfHouses />
            </Route>
            <Route>
              <Homepage />
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
}
