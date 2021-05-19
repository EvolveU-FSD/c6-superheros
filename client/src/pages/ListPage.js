import React, { useEffect, useState } from 'react';
import './ListPage.css';

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
      let response = await fetch('/superhero/'+superheroId);
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

const ListPage = () => {
    const [rows, setRows] = useState([]);
    const [selectedSuperheroId, setSelectedSuperheroId] = useState()

    useEffect(() => {
      const getSuperheroes = async () => {
        // fetch uses the "proxy" value set in client/package.json
        let response = await fetch('/superhero');
        let data = await response.json();
        setRows(data);
      };
      getSuperheroes();
    }, []);
  
    return (
      <div className="superhero-table">
        <table>
            <tbody>
              <tr><th>Name</th><th>Nickname</th><th>Alter Ego</th><th>Sidekick</th></tr>
              {rows.map((row) => {
                  return (
                    <tr key={row.name} onClick={() => setSelectedSuperheroId(row._id)}>
                        <td>{row.name}</td>
                        <td>{row.nickname}</td>
                        <td>{row.alterego}</td>
                        <td>{row.sidekick}</td>
                    </tr>
                  )
              })}                
            </tbody>
        </table>

        { selectedSuperheroId && <SuperheroDetail superheroId={ selectedSuperheroId }/> }
      </div>
    )
  }

export default ListPage