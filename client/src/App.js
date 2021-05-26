import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import ListPage from './pages/ListPage'
import SuperheroDetailPage from './pages/SuperheroDetailPage'
import SuperheroEditPage from './pages/SuperheroEditPage'
import RegistrationPage from './pages/RegistrationPage'
import AuthenticationProvider from './AuthenticationProvider'
import LogInOrOut from './components/LogInOrOut'
import AgentOnly from './components/AgentOnly';

const App = () => {
  return (
    <AuthenticationProvider>
      <Router>
        <div>
          <div className="title-bar">
            <h1>Superhero Registry</h1>
            <AgentOnly>
              <Link to="/">List View</Link>
            </AgentOnly>
            <Link to="/register">Register</Link>
            <LogInOrOut />
          </div>
          <Switch>
            <Route path="/register">
              <RegistrationPage />
            </Route>
            <Route path="/superhero/:superheroId/edit">
              <SuperheroEditPage />
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
    </AuthenticationProvider>
  );
};

export default App;
