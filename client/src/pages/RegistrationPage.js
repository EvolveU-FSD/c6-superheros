import { useState } from "react"
import { useHistory } from "react-router-dom";

const RegistrationPage = () => {
    let [name, setName] = useState()
    let [nickname, setNickname] = useState()
    let [alterego, setAlterego] = useState()
    let [sidekick, setSidekick] = useState()

    let [createError, setCreateError] = useState()

    let history = useHistory()

    async function onCreateClicked() {
        console.log('Create has been clicked!')
        let superheroToCreate = {
            name, 
            nickname,
            alterego,
            sidekick
        }
        console.log('Creating superhero with', superheroToCreate )
        try {
            let createResponse = await fetch('/superhero', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(superheroToCreate)
            })
            // the server didn't like the data for some reason
            console.log('Create response is', createResponse)
            if (createResponse.status !== 200) {
                let errorMessage = await createResponse.text()
                console.log('We had an error.  it was: ', errorMessage)
                setCreateError(errorMessage)
            }
            else {
                setCreateError(undefined)
                // go back to the list view!
                history.push("/")
            }
        }
        catch (error) {
            // the server cannot be reached
            console.error('Fetch failed to reach the server.')
        }
    }

    const onInputChange = (event, setFunction) => {
        console.log('Changing input to be ', event.target.value)
        setFunction(event.target.value);
    };

    let createSuperheroDataInvalid = !name || (name.trim().length === 0)

    return (
        <div>
            <div>
                <label htmlFor="name">Name</label>
                <input id="name" value={name} onChange={(event) => onInputChange(event,setName)}/>
            </div>
            <div>
                <label htmlFor="nickname">Nickname</label>
                <input id="nickname" value={nickname} onChange={(event) => onInputChange(event,setNickname)}/>
            </div>
            <div>
                <label htmlFor="alterego">Alter ego</label>
                <input id="alterego" value={alterego} onChange={(event) => onInputChange(event,setAlterego)}/>
            </div>
            <div>
                <label htmlFor="sidekick">Sidekick</label>
                <input id="sidekick" value={sidekick} onChange={(event) => onInputChange(event,setSidekick)}/>
            </div>
            <button disabled={ createSuperheroDataInvalid } onClick={ onCreateClicked }>Create Superhero</button>
            { createError && <div>{createError}</div> }            
        </div>
    )
}

export default RegistrationPage