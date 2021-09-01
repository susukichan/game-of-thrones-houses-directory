import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { NineHouses } from "./NineHouses";
import { ListOfHouses } from "./ListOfHouses";
import { Homepage } from "./Homepage";
import "./components/FontAwesomeIcon/FontAwesomeIcon";

export function App() {
  const [backgroundImage, setBackgoundImage] = useState("url(homepage.jpg)");

  return (
    <Router>
      <div className="App" style={{ backgroundImage: backgroundImage }}>
        {/* the route props? */}
        <nav className="nav-bar">
          <Link to="/" onClick={() => setBackgoundImage("url(homepage.jpg)")}>
            Home
          </Link>
          <Link
            to="nine-houses"
            onClick={() => setBackgoundImage("url(nine-houses.jpg)")}
          >
            Nine Houses
          </Link>
          <Link
            to="list-of-houses"
            onClick={() => setBackgoundImage("url(list-of-houses.jpg)")}
          >
            List of Houses
          </Link>
        </nav>
        <main className="main">
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
