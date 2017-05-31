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

            return Object.assign({}, state, {
                gameState: handlePlayerMove(state.gameState, action.payload)
            })
            break
    }
    return state
}

/* Handle player move */
function handlePlayerMove(gameState, key) {


    for (var i = 0; i < gameState.length; i += 1) {
        for (var k = 0; k < gameState[i].length; k += 1) {
            if (gameState[i][k] === "player") {
                switch(key) {
                    case "ArrowUp":
                        if (checkMove(gameState, i - 1, k) === "move") {
                            gameState[i - 1][k] = "player"
                            gameState[i][k] = 1
                        }
                        break
                    case "ArrowDown":
                        if (checkMove(gameState, i + 1, k) === "move") {
                            gameState[i + 1][k] = "player"
                            gameState[i][k] = 1
                        }
                        break
                    case "ArrowLeft":
                        if (checkMove(gameState, i, k - 1) === "move") {
                            gameState[i][k - 1] = "player"
                            gameState[i][k] = 1
                        }
                        break
                    case "ArrowRight":
                        if (checkMove(gameState, i, k + 1) === "move") {
                            gameState[i][k + 1] = "player"
                            gameState[i][k] = 1
                        }
                        break
                }
                return gameState
            }
        }
    }
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
