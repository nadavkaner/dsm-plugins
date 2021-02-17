import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AssetsListPlugin from "./AssetsListPlugin";
import GiphyPlugin from "./GiphyPlugin";
import "./App.css";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/assets-list-plugin">
          <AssetsListPlugin />
        </Route>
        <Route path="/giphy-plugin">
          <GiphyPlugin />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
