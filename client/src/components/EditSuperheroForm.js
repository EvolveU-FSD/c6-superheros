import { useState } from "react"

const EditSuperheroForm = ({name, nickname, sidekick, alterego, onSave, saveError, saveButtonCaption }) => {
    let [updatedName, setUpdatedName] = useState(name)
    let [updatedNickname, setUpdatedNickname] = useState(nickname)
    let [updatedAlterego, setUpdatedAlterego] = useState(alterego)
    let [updatedSidekick, setUpdatedSidekick] = useState(sidekick)


    async function onSaveClicked() {
        console.log('Create has been clicked!')
        let updatedSuperhero = {
            name: updatedName, 
            nickname: updatedNickname,
            alterego: updatedAlterego,
            sidekick: updatedSidekick
        }
        console.log('Creating superhero with', updatedSuperhero )
        onSave(updatedSuperhero)
    }

    const onInputChange = (event, setFunction) => {
        console.log('Changing input to be ', event.target.value)
        setFunction(event.target.value);
    };

    let createSuperheroDataInvalid = !updatedName || (updatedName.trim().length === 0)

    return (
        <div>
            <div>
                <label htmlFor="name">Name</label>
                <input id="name" value={updatedName} onChange={(event) => onInputChange(event,setUpdatedName)}/>
            </div>
            <div>
                <label htmlFor="nickname">Nickname</label>
                <input id="nickname" value={updatedNickname} onChange={(event) => onInputChange(event,setUpdatedNickname)}/>
            </div>
            <div>
                <label htmlFor="alterego">Alter ego</label>
                <input id="alterego" value={updatedAlterego} onChange={(event) => onInputChange(event,setUpdatedAlterego)}/>
            </div>
            <div>
                <label htmlFor="sidekick">Sidekick</label>
                <input id="sidekick" value={updatedSidekick} onChange={(event) => onInputChange(event,setUpdatedSidekick)}/>
            </div>
            <button disabled={ createSuperheroDataInvalid } onClick={ onSaveClicked }>{saveButtonCaption}</button>
            { saveError && <div>{saveError}</div> }            
        </div>
    )
}

export default EditSuperheroForm
