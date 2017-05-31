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
            case "potion": {
                takePotion(key, game, y, x)
                break
            }
            case "chest":
                openChest(key, game, y, x)
                break
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

    /* Restore */
    if (game.player.currentHealth < game.player.maxHealth) {
        game.player.currentHealth = game.player.currentHealth
        + game.potion.restore < game.player.maxHealth
        ? game.player.currentHealth + game.potion.restore
        : game.player.maxHealth
    }

    /* Move */
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

/* Open chest */
function openChest(key, game, y, x) {

    /* Open */
    switch(game.chest.items[Math.floor(Math.random() * 4)]) {
        case "weapon":
            game.player.currentWeapon += 1
            break
        case "strength":
            game.player.strength += 1
            game.player.attackLow = 4 * game.player.strength
            game.player.attackHigh = 6 * game.player.strength
            break
        case "vitality":
            game.player.vitality += 1
            game.player.maxHealth = 100 + (10 * game.player.vitality)
            game.player.currentHealth += 10
            break
        case "agility":
            game.player.agility += 1
            break

    }

    /* Move */
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
