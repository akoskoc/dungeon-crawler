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
                        event.preventDefault()
                        if(this.props.game.player.isAlive === true) {
                            this.props.playerRound(event.key)
                        }
                    }
            })
            canvas.addEventListener("click", (event) => {

                if(this.props.game.player.isAlive === false || this.props.game.won) {
                    this.props.playerDeath()
                } else {
                    var width = canvas.getBoundingClientRect().right - canvas.getBoundingClientRect().left
                    var X = event.clientX - canvas.getBoundingClientRect().left
                    var Y = event.clientY - canvas.getBoundingClientRect().top

                    if (X < width / 4) {
                        this.props.playerRound("ArrowLeft")
                    } else if (X > width / 4 * 3) {
                        this.props.playerRound("ArrowRight")
                    } else if (Y < width / 4) {
                        this.props.playerRound("ArrowUp")
                    } else if (Y > width / 4 * 3) {
                        this.props.playerRound("ArrowDown")
                    }
                }
            })
        }
    }

    componentDidUpdate() {
        if (this.props.game.won) {
            var c = this.refs.canvas.getContext("2d")
            c.drawImage(this.props.sprites.won.img, 0, 0)
        } else if (this.props.game.player.isAlive === false) {
            /* Player death */
            var c = this.refs.canvas.getContext("2d")
            c.drawImage(this.props.sprites.dead.img, 0, 0)
        } else if (this.props.game.gameState.length === 0) {
            /* Reset game */
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
                    this.props.game.level,
                    this.props.game.Skeleton,
                    this.props.game.Bat,
                    this.props.game.potion,
                    this.props.game.chest,
                    this.props.game.Werewolf,
                    this.props.game.Boss,
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



        /* Darkness */
        c.fillRect(0, 0, canvas.width, canvas.height)
        var playerPos = {
            y: null,
            x: null
        }

        /* Calc position of player to determine the vision */
        for (var y = 0; y < this.props.game.gameState.length; y += 1) {
            for (var x = 0; x < this.props.game.gameState[y].length; x += 1) {
                if (typeof this.props.game.gameState[y][x] === "object") {
                    if (this.props.game.gameState[y][x].name === "player") {
                        playerPos.y = y
                        playerPos.x = x
                    }
                }
            }
        }


        /* Draw stuff if in vision of player */
        if(playerPos.x) {
            vision(playerPos.x, playerPos.y, this.props.game.player.vision).forEach((position) => {
                if (typeof this.props.maps[this.props.game.level - 1][position.y][position.x] === "number") {
                    fillBackground(this.props.maps[this.props.game.level - 1][position.y][position.x], c, position.y, position.x)
                }
                fillObjects(this.props.game.gameState[position.y][position.x].name , c, position.y, position.x)
            })

        }



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


        /* Switch */
        function fillObjects(name, c, y, x) {
            var pickTile = {
                "Skeleton": () => c.drawImage(skeleton, 16 * x, 16 * y),
                "Bat": () => c.drawImage(bat, 16 * x, 16 * y),
                "potion": () => c.drawImage(potion, 16 * x, 16 * y),
                "chest": () => c.drawImage(chest, 16 * x, 16 * y),
                "Werewolf": () => c.drawImage(miniboss, 16 * x, 16 * y),
                "Boss": () => c.drawImage(finalboss, 16 * x, 16 * y),
                "player": () => c.drawImage(player, 16 * x, 16 * y),
                "default": () => {return}
            }
            pickTile[name || "default"]()
        }
    }

    /* Render */
    render() {
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
function Population(level, skeleton, bat, potion, chest, werewolf, boss, player) {
    this.skeleton = Object.assign({}, skeleton, {
        health: Math.floor(skeleton.health * ( 0.5 + level / 2 )),
        currentHealth: Math.floor(skeleton.health * ( 0.5 + level / 2 )),
        attackLow: Math.floor(skeleton.attackLow * ( 0.5 + level / 2 )),
        attackHigh: Math.floor(skeleton.attackHigh * ( 0.5 + level / 2 )),
        number: skeleton.number + (Math.floor(Math.random() * 3) - 1) + (level * 2)
    })
    this.bat = Object.assign({}, bat, {
        health: Math.floor(bat.health * ( 0.5 + level / 2 )),
        currentHealth: Math.floor(bat.health * ( 0.5 + level / 2 )),
        attackLow: Math.floor(bat.attackLow * ( 0.5 + level / 2 )),
        attackHigh: Math.floor(bat.attackHigh * ( 0.5 + level / 2 )),
        number: bat.number + (Math.floor(Math.random() * 3) - 1) + (level * 2)
    })
    this.potion = Object.assign({}, potion, {
        restor: Math.floor(potion.restore * ( 0.75 + level / 4 )),
        number: potion.number + (Math.floor(Math.random() * 3) - 1)
    })
    this.chest = Object.assign({}, chest, {
        number: chest.number + (Math.floor(Math.random() * 3) - 1) + level
    })
    this.werewolf = Object.assign({}, werewolf, {
        health: Math.floor(werewolf.health * ( 0.5 + level / 2 )),
        currentHealth: Math.floor(werewolf.health * ( 0.5 + level / 2 )),
        attackLow: Math.floor(werewolf.attackLow * ( 0.5 + level / 2 )),
        attackHigh: Math.floor(werewolf.attackHigh * ( 0.5 + level / 2 ))
    })
    this.boss = Object.assign({}, boss)
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

/* Calc vision */
function vision(x, y, vision) {
    var rtn = []
    for (var i = - vision; i < vision + 1; i += 1) {
        for (var k = -vision + Math.abs(i); k < vision - Math.abs(i) + 1; k += 1) {
            if ((y + i >= 0 && y + i <= 24) && (x + k >= 0 && x + k <= 24)) {
                rtn.push({
                    y: y + i,
                    x: x + k
                })
            }
        }
    }
    return rtn
}
