import React from "react"
import { connect } from "react-redux"



class CanvasComponent extends React.Component {
    componentDidMount() {
        var canvas = this.refs.canvas
        var c = canvas.getContext("2d")

        canvas.height = 320
        canvas.width = 320

        var dirt = new Image();
        dirt.src = "./img/dirt.png";
        c.drawImage(dirt, 16, 16)


    }
    render() {
        return(
            <div>
                <canvas ref="canvas"></canvas>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return state
}


export default connect(mapStateToProps)(CanvasComponent)
