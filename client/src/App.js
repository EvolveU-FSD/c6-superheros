import './App.css';
import SuperheroesTable from './components/SuperheroesTable'
import RegistrationForm from './components/RegistrationForm'

const App = () => {
  return (
    <div>
      <div className="title-bar">
        <h1>Superhero Registry</h1>
      </div>
      <SuperheroesTable />
      <RegistrationForm />
    </div>
  );
};

export default App;
