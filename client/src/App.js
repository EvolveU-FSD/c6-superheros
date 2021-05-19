import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import SuperheroesTable from './components/SuperheroesTable'
import RegistrationForm from './components/RegistrationForm'

const App = () => {
  return (
    <Router>
      <div>
        <div className="title-bar">
          <h1>Superhero Registry</h1>
          <Link to="/">List View</Link>
          <Link to="/register">Register</Link>
        </div>
        <Switch>
          <Route path="/register">
            <RegistrationForm />
          </Route>
          <Route path="/">
            <SuperheroesTable />
          </Route>          
        </Switch>
      </div>
    </Router>
  );
};

export default App;
