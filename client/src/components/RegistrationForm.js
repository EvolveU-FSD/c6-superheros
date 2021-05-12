import { useState } from "react"

const RegistrationForm = () => {
    let [name, setName] = useState()
    let [nickname, setNickname] = useState()
    let [alterego, setAlterego] = useState()
    let [sidekick, setSidekick] = useState()

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

    return (
        <div>
            <div>
                <label for="name">Name</label>
                <input id="name" value={name} onChange={(event) => onInputChange(event,setName)}/>
            </div>
            <div>
                <label for="nickname">Nickname</label>
                <input id="nickname" value={nickname} onChange={(event) => onInputChange(event,setNickname)}/>
            </div>
            <div>
                <label for="alterego">Alter ego</label>
                <input id="alterego" value={alterego} onChange={(event) => onInputChange(event,setAlterego)}/>
            </div>
            <div>
                <label for="sidekick">Sidekick</label>
                <input id="sidekick" value={sidekick} onChange={(event) => onInputChange(event,setSidekick)}/>
            </div>
            <button onClick={ onCreateClicked }>Create Superhero</button>
        </div>
    )
}

export default RegistrationForm