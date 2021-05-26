
const BlueBox = ({children}) => {
    const theStyle = {
        backgroundColor: 'blue', 
        padding:'1em'
    }
    // background-color: "blue";, padding: 1em;
    return (
        <div style={theStyle}>
            { children }
        </div>
    )
}

export default BlueBox
