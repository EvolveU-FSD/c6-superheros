import { useState } from "react"
import { useHistory } from "react-router-dom";

import EditSuperheroForm from '../components/EditSuperheroForm';

const RegistrationPage = () => {
    let [saveError, setSaveError] = useState()

    let history = useHistory()

    let onSave = async function(updatedSuperhero) {
        try {
            let createResponse = await fetch('/api/superhero', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedSuperhero)
            })
            // the server didn't like the data for some reason
            console.log('Create response is', createResponse)
            if (createResponse.status !== 200) {
                let errorMessage = await createResponse.text()
                console.log('We had an error.  it was: ', errorMessage)
                setSaveError(errorMessage)
            }
            else {
                setSaveError(undefined)
                // go back to the list view!
                history.push("/")
            }
        }
        catch (error) {
            // the server cannot be reached
            console.error('Fetch failed to reach the server.')
        }

    }

    return (
        <EditSuperheroForm 
            onSave={onSave} 
            saveError={saveError} 
            saveButtonCaption="Create Superhero"
        />
    )
}

export default RegistrationPage