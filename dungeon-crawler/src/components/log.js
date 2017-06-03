import React from "react"
import { connect } from "react-redux"

class LogComponent extends React.Component {
    render() {
        return(
            <div className="log">
                {this.props.game.log.map((text) => <div>{text}</div>)}
            </div>
        )
    }
}

function mapStatesToProps(state) {
    return state
}

export default connect(mapStatesToProps)(LogComponent)
