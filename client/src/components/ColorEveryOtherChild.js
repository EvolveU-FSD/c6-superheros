
const ColorEveryOtherChild = ({ children }) => {
    const blueStyle = {
        backgroundColor: "blue"
    }
    const grayStyle = {
        backgroundColor: "gray"
    }

    const wrappedChildren = children.map((child, index) => {
        if ((index % 2) === 0) {
            // even row
            return <div style={blueStyle}>{child}</div>
        }
        else {
            // odd row
            return <div style={grayStyle}>{child}</div>
        }
    })
    return wrappedChildren
}

export default ColorEveryOtherChild