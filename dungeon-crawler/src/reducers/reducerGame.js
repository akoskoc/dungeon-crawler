import data from "./../data/data"


export default function gameReducer(state = data.game, action) {
    switch(action.type) {
        case "SET_GAME_STATE":
            return Object.assign({}, state, {
                gameState: action.payload
            })
            break
        case "PLAYER_ROUND":

            return Object.assign({}, state, {
                gameState: handlePlayerMove(state.gameState, action.payload)
            })
            break
    }
    return state
}

/* Handle player move */
function handlePlayerMove(gameState, key) {

    gameState.forEach((row, y) => {
        row.forEach((tile, x) => {
            if (tile === "player") {
                switch(key) {
                    case "ArrowUp":
                        if (checkMove(gameState, y - 1, x) === "move") {
                            gameState[y - 1][x] = "player"
                            gameState[y][x] = 1
                        }
                        break
                }
            }
        })
    })
    return gameState
}


/* Check move */
function checkMove(gameState, y, x) {
    if (gameState[y][x] !== 0 && gameState[y][x] !== undefined) {
        switch(gameState[y][x]) {
            default:
                return "move"
                break
        }
    }
}
