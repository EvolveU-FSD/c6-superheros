import React from 'react'

const AuthenticationContext = React.createContext({
    username: '',
    isAgent: false,
    logIn: (username, isAgent) => {},
    logOut: () => {}
})

export default AuthenticationContext
