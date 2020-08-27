import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Fib from './Fib';
import OtherPage from './OtherPage';
import logo from './logo.svg';
import './App.css';


function App() {
  return (
    <Router>
      <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <Link to='/'>Home</Link>
            <Link to='/otherpage'>OtherPage</Link>
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              feature branch
            </a>
          </header>
        </div>
      <Switch>
          <Route path="/otherpage">
            <OtherPage />
          </Route>
          <Route path="/">
            <Fib />
          </Route>
        </Switch>
    </Router>
  );
}

export default App;
