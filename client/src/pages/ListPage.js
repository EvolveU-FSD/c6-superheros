import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

import './ListPage.css';

const ListPage = () => {
    const [rows, setRows] = useState([])

    const history = useHistory()

    useEffect(() => {
      const getSuperheroes = async () => {
        // fetch uses the "proxy" value set in client/package.json
        let response = await fetch('/api/superhero')
        let data = await response.json()
        setRows(data)
      }
      getSuperheroes()
    }, [])
  
    return (
      <div className="superhero-table">
        <table>
            <tbody>
              <tr><th>Name</th><th>Nickname</th><th>Alter Ego</th><th>Sidekick</th></tr>
              {rows.map((row) => {
                  return (                                     
                    <tr key={row.name} onClick={() => { history.push('/superhero/' + row._id) }}>
                        <td>{row.name}</td>
                        <td>{row.nickname}</td>
                        <td>{row.alterego}</td>
                        <td>{row.sidekick}</td>
                    </tr>
                  )
              })}                
            </tbody>
        </table>
      </div>
    )
  }

export default ListPage