import React from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"

/* Action creators */
import setGameState from "./../actions/setGameState"
import playerRound from "./../actions/playerRound"
import playerDeath from "./../actions/playerDeath"



class CanvasComponent extends React.Component {


    componentDidMount() {
        var canvas = this.refs.canvas

        /* Canvas size */
        canvas.height = this.props.game.size
        canvas.width = this.props.game.size

        /* Wait for the images to load */
        window.onload = () => {
            this.draw(true)

            /* Key event listener + update state */
            canvas.addEventListener("keydown", (event) => {
                if (event.key === "ArrowUp"
                    || event.key === "ArrowDown"
                    || event.key === "ArrowLeft"
                    || event.key === "ArrowRight") {
                        this.props.playerRound(event.key)
                    }
            })
        }
    }

    componentDidUpdate() {
        if (this.props.game.player.isAlive === false) {
            /* Player death */
            this.props.playerDeath()
        } else if (this.props.game.gameState.length === 0) {
            /* Player died need reset */
            this.draw(true)
        } else if (this.props.game.level !== this.props.game.currentLevel ) {
            /* New level */
            this.draw(true)
        }  else {
            this.draw(false)
        }
    }



    draw(init) {
        var canvas = this.refs.canvas,
            c = canvas.getContext("2d"),
            dirt = this.props.sprites.dirt.img,
            floor = this.props.sprites.floor.img,
            player = this.props.sprites.player.img,
            skeleton = this.props.sprites.skeleton.img,
            potion = this.props.sprites.potion.img,
            torch = this.props.sprites.torch.img,
            wall = this.props.sprites.wall.img,
            chest = this.props.sprites.chest.img,
            bat = this.props.sprites.bat.img,
            portal = this.props.sprites.portal.img,
            door = this.props.sprites.door.img,
            miniboss = this.props.sprites.miniboss.img,
            finalboss = this.props.sprites.finalboss.img

        /* Init if first time running */
        if (init) {
            var initGameState = [],
                population = new Population(
                    this.props.game.skeleton,
                    this.props.game.bat,
                    this.props.game.potion,
                    this.props.game.chest,
                    this.props.game.miniboss,
                    this.props.game.finalboss,
                    this.props.game.player)

            /* Fill gameState */
            this.props.maps[this.props.game.level - 1].forEach((row, y) => {
                initGameState.push([])
                row.forEach((tile, x) => {
                    pickTile(tile, initGameState, y, x)
                })
            })

            /* Switch */
            function pickTile(tile, initGameState, y, x) {
                var pickTile = {
                    "0": () => initGameState[y].push(1),
                    "1": () => initGameState[y].push(1),
                    "2": () => initGameState[y].push(0),
                    "3": () => initGameState[y].push(0),
                    "4": () => initGameState[y].push(2),
                    "5": () => initGameState[y].push(1),
                }
                pickTile[tile.toString()]()
            }

            /* Place stuff on the map */
            initGameState = placeObjects(initGameState, population)
            this.props.setGameState(initGameState)
        }

        /* Display map */
        this.props.maps[this.props.game.level - 1].forEach((row, y) => {
            row.forEach((tile, x) => {
                fillBackground(tile, c, y, x)
            })
        })

        /* Switch */
        function fillBackground(tile, c, y, x) {
            var pickTile = {
                "0": () => c.drawImage(dirt, 16 * x,16 * y),
                "1": () => c.drawImage(floor, 16 * x,16 * y),
                "2": () => c.drawImage(wall, 16 * x,16 * y),
                "3": () => {
                    c.drawImage(wall, 16 * x,16 * y)
                    c.drawImage(torch, 16 * x,16 * y)
                },
                "4": () => {
                    c.drawImage(floor, 16 * x,16 * y)
                    c.drawImage(portal, 16 * x,16 * y)
                },
                "5": () => {
                    c.drawImage(floor, 16 * x,16 * y)
                    c.drawImage(door, 16 * x,16 * y)
                }
            }
            pickTile[tile.toString()]()
        }


        /* Draw objects */
        this.props.game.gameState.forEach((row, y) => {
            row.forEach((item, x) => {
                fillObjects(item.name, c, y, x)
            })
        })

        /* Switch */
        function fillObjects(name, c, y, x) {
            var pickTile = {
                "skeleton": () => c.drawImage(skeleton, 16 * x, 16 * y),
                "bat": () => c.drawImage(bat, 16 * x, 16 * y),
                "potion": () => c.drawImage(potion, 16 * x, 16 * y),
                "chest": () => c.drawImage(chest, 16 * x, 16 * y),
                "miniboss": () => c.drawImage(miniboss, 16 * x, 16 * y),
                "finalboss": () => c.drawImage(finalboss, 16 * x, 16 * y),
                "player": () => c.drawImage(player, 16 * x, 16 * y),
                "default": () => {return}
            }
            pickTile[name || "default"]()
        }
    }

    /* Render */
    render() {
        console.log(this.props.game.player)
        return(
            <canvas ref="canvas" tabIndex="1"></canvas>
        )
    }
}

function mapStateToProps(state) {
    return state
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        setGameState,
        playerRound,
        playerDeath
    }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(CanvasComponent)



/* Constructors */
function Population(skeleton, bat, potion, chest, miniboss, finalboss, player) {
    this.skeleton = Object.assign({}, skeleton, {
        number: skeleton.number + (Math.floor(Math.random() * 3) - 1)
    })
    this.bat = Object.assign({}, bat, {
        number: bat.number + (Math.floor(Math.random() * 3) - 1)
    })
    this.potion = Object.assign({}, potion, {
        number: potion.number + (Math.floor(Math.random() * 3) - 1)
    })
    this.chest = Object.assign({}, chest, {
        number: chest.number + (Math.floor(Math.random() * 3) - 1)
    })
    this.miniboss = Object.assign({}, miniboss)
    this.finalboss = Object.assign({}, finalboss)
    this.player = Object.assign({}, player)
}

/* Randomize objects on the map */
function placeObjects(gameState, population) {
    var emptyPlace = []
    for (var y = 0; y < gameState.length; y += 1) {
        for (var x = 0; x < gameState[y].length; x += 1) {
            if (gameState[y][x] === 1) {
                emptyPlace.push({x: x, y: y})
            }
        }
    }

    for (var object in population) {
        for (var i = 0; i < population[object].number; i += 1) {
            var num = Math.floor(Math.random() * emptyPlace.length)
            gameState[emptyPlace[num].y][emptyPlace[num].x] = Object.assign({}, population[object])
            emptyPlace = emptyPlace.filter((item) => item !== emptyPlace[num])
        }
    }

    return gameState
}
