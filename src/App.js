import React from "react";
import "./App.css";
import AssetsListPlugin from "./AssetsListPlugin";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
      <Switch>
        <Route path="/assets-list-plugin">
          <AssetsListPlugin />
        </Route>
        {/* <Route path="/giphy-plugin">
            <Users />
          </Route> */}
      </Switch>
    </Router>
  );
}

export default App;
