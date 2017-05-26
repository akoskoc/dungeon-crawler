import React from "react"
import { connect } from "react-redux"



class CanvasComponent extends React.Component {
    componentDidMount() {
        var canvas = this.refs.canvas
        var c = canvas.getContext("2d")

        canvas.height = this.props.game.viewSize
        canvas.width = this.props.game.viewSize

        /* For chrome, upload images on the internet, or try different approach, google it. dirt: https://image.ibb.co/eR80Ca/dirt.png*/
        var dirt = new Image();
        dirt.src = "./img/dirt.png"

        var floor = new Image()
        floor.src = "./img/floor.png"

        var char = new Image()
        char.src = "./img/char.png"

        var skeleton = new Image()
        skeleton.src = "./img/skeleton.png"

        var potion = new Image()
        potion.src = "./img/potion.png"

        var torch = new Image()
        torch.src = "./img/torch.png"

        var wall = new Image()
        wall.src = "./img/wall.png"

        var chest = new Image()
        chest.src = "./img/chest.png"

        var bat = new Image()
        bat.src = "./img/bat.png"

        for (var i = 0; i < 20; i += 1) {
            for (var k = 0; k < 20; k += 1) {
                c.drawImage(dirt, i * 16 + 16, k * 16 + 16)

            }
        }

        c.drawImage(skeleton, 50, 50)

        c.drawImage(bat, 100, 50)
        c.drawImage(chest, 100, 100)



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
