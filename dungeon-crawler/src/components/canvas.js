import React from "react"

import { connect } from "react-redux"

class CanvasComponent extends React.Component {
    render() {
        console.log(this.props.character)
        return(
            <canvas></canvas>
        )
    }
}

function mapStateToProps(state) {
    return state
}


export default connect(mapStateToProps)(CanvasComponent)
