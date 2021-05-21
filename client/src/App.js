import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import ListPage from './pages/ListPage'
import SuperheroDetailPage from './pages/SuperheroDetailPage'
import RegistrationPage from './pages/RegistrationPage'

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
            <RegistrationPage />
          </Route>
          <Route path="/superhero/:superheroId">
            <SuperheroDetailPage />
          </Route>
          <Route path="/">
            <ListPage />
          </Route>          
        </Switch>
      </div>
    </Router>
  );
};

export default App;
