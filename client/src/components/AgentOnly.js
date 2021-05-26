import { useContext } from "react"
import AuthenticationContext from "../AuthenticationContext"

const AgentOnly = ({children}) => {
    const authContext = useContext(AuthenticationContext)
    return (authContext.isAgent) ? children : null 
}

export default AgentOnly