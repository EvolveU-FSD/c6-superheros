
import { useState } from 'react'
import AuthenticationContext from './AuthenticationContext'

const AuthenticationProvider = ({ children }) => {
    let [username, setUsername] = useState()
    let [isAgent, setIsAgent] = useState(false)

    const logIn = (username, password) => {
        async function logintoserver() {
            let loginOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            }
            let response = await fetch('/api/auth/login', loginOptions)
            let loggedInUser = await response.json()
            console.log('The call the auth returned: ', loggedInUser)
            setUsername(loggedInUser.username)
            setIsAgent(loggedInUser.isAgent)    
        }
        logintoserver()
    }

    const logOut = () => {
        setUsername(undefined)
        setIsAgent(false)
    }

    let contextValue = {
        username, 
        isAgent,
        logIn,
        logOut
    }

    return (
        <AuthenticationContext.Provider value={ contextValue }>
            { children }
        </AuthenticationContext.Provider>
    )
}

export default AuthenticationProvider
