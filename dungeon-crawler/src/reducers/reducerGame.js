import data from "./../data/data"


export default function gameReducer(state = data.game, action) {
    switch(action.type) {

        /* Init */
        case "SET_GAME_STATE":
            return Object.assign({}, state, {
                gameState: action.payload
            })
            break

        /* Player input */
        case "PLAYER_ROUND":

            return Object.assign({},
                handlePlayerMove(state,  action.payload)
            )
            break
    }
    return state
}

/* Handle player move */
function handlePlayerMove(game, key) {

    for (var i = 0; i < game.gameState.length; i += 1) {
        for (var k = 0; k < game.gameState[i].length; k += 1) {
            if (game.gameState[i][k] === "player") {
                switch(key) {
                    case "ArrowUp":
                        checkMove(key, game, i - 1, k)
                        break
                    case "ArrowDown":
                        checkMove(key, game, i + 1, k)
                        break
                    case "ArrowLeft":
                        checkMove(key, game, i, k - 1)
                        break
                    case "ArrowRight":
                        checkMove(key, game, i, k + 1)
                        break
                }
                return game
            }
        }
    }
}


/* Check move */
function checkMove(key, game, y, x) {

    if (game.gameState[y][x] !== 0 && game.gameState[y][x] !== undefined) {
        switch(game.gameState[y][x]) {
            case "potions": {
                takePotion(key, game, y, x)
                break
            }
            case 1:
                move(key, game, y, x)
                break
        }
    }
}
/* Move player*/
function move(key, game, y, x) {
    switch(key) {
        case "ArrowUp":
            game.gameState[y][x] = "player"
            game.gameState[y + 1][x] = 1

            break
        case "ArrowDown":
            game.gameState[y][x] = "player"
            game.gameState[y - 1][x] = 1

            break
        case "ArrowLeft":
            game.gameState[y][x] = "player"
            game.gameState[y][x + 1] = 1

            break
        case "ArrowRight":
            game.gameState[y][x] = "player"
            game.gameState[y][x - 1] = 1

            break
    }
}

/* Take potion */
function takePotion(key, game, y, x) {
    if (game.player.currentHealth < game.player.maxHealth) {
        game.player.currentHealth = game.player.currentHealth
        + game.potion.restore < game.player.maxHealth
        ? game.player.currentHealth + game.potion.restore
        : game.player.maxHealth
    }
    switch(key) {
        case "ArrowUp":
            game.gameState[y][x] = "player"
            game.gameState[y + 1][x] = 1

            break
        case "ArrowDown":
            game.gameState[y][x] = "player"
            game.gameState[y - 1][x] = 1

            break
        case "ArrowLeft":
            game.gameState[y][x] = "player"
            game.gameState[y][x + 1] = 1

            break
        case "ArrowRight":
            game.gameState[y][x] = "player"
            game.gameState[y][x - 1] = 1

            break
    }
}
