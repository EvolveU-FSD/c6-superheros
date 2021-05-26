
import { useState } from 'react'
import AuthenticationContext from './AuthenticationContext'

const AuthenticationProvider = ({ children }) => {
    let [username, setUsername] = useState()
    let [isAgent, setIsAgent] = useState(false)

    const logIn = (loginUsername, loginAgent ) => {
        setUsername(loginUsername)
        setIsAgent(loginAgent)
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
