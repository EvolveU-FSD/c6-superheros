import { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'

import EditSuperheroForm from '../components/EditSuperheroForm'

const SuperheroEditPage = () => {

    let [superhero, setSuperhero] = useState()
    let [saveError, setSaveError] = useState()

    let history = useHistory()
    const { superheroId } = useParams()

    useEffect(() => {
        const getSuperhero = async () => {
          // fetch uses the "proxy" value set in client/package.json
          let response = await fetch('/api/superhero/'+superheroId);
          let data = await response.json();
          setSuperhero(data);
        };
        getSuperhero();
    }, [superheroId])
  
    let onSave = async function(updatedSuperhero) {
        try {
            let putResponse = await fetch('/api/superhero/'+superheroId, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedSuperhero)
            })
            // the server didn't like the data for some reason
            console.log('Response is', putResponse)
            if (putResponse.status !== 200) {
                let errorMessage = await putResponse.text()
                console.log('We had an error.  it was: ', errorMessage)
                setSaveError(errorMessage)
            }
            else {
                setSaveError(undefined)
                // go back to the list view!
                history.push("/superhero/" + superheroId)
            }
        }
        catch (error) {
            // the server cannot be reached
            console.error('Fetch failed to reach the server.')
        }

    }

    return (
        <div>
            <h2>Editing Superhero</h2>
            { superhero && 
                <EditSuperheroForm 
                    onSave={onSave} 
                    saveError={saveError} 
                    saveButtonCaption="Save Superhero"
                    name={superhero.name}
                    nickname={superhero.nickname}
                    alterego={superhero.alterego}
                    sidekick={superhero.sidekick}
                />
            }
        </div>
    )
}

export default SuperheroEditPage 