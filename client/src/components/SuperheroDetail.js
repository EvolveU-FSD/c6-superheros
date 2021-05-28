import { useState, useEffect } from 'react'

const SuperheroDetail = ({ superheroId }) => {
    const [superhero, setSuperhero] = useState({
      name: "",
      nickname: "",
      alterego: "",
      sidekick: ""
    })
  
    useEffect(() => {
      const getSuperhero = async () => {
        // fetch uses the "proxy" value set in client/package.json
        let response = await fetch('/api/superhero/'+superheroId);
        let data = await response.json();
        setSuperhero(data);
      };
      getSuperhero();
    }, [superheroId])
  
    return (
      <div>
        <div>Name:  {superhero.name} </div>
        <div>Nickname:  {superhero.nickname} </div>
        <div>Alter Ego:  {superhero.alterego} </div>
        <div>Sidekick:  {superhero.sidekick} </div>
      </div>
    )
  }
  
  export default SuperheroDetail