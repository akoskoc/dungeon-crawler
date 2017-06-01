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

    for (var y = 0; y < game.gameState.length; y += 1) {
        for (var x = 0; x < game.gameState[y].length; x += 1) {
            if (game.gameState[y][x].name === "player") {
                keyPress(key, game, y, x)
                return game
            }
        }
    }

    /* Switch */
    function keyPress(key, game, y, x) {
        var pressed = {
            "ArrowUp": () => checkMove(key, game, y - 1, x),
            "ArrowDown": () => checkMove(key, game, y + 1, x),
            "ArrowLeft": () => checkMove(key, game, y, x - 1),
            "ArrowRight": () => checkMove(key, game, y, x + 1)
        }
        pressed[key]()
    }
}


/* Check move */
function checkMove(key, game, y, x) {

    if (game.gameState[y][x] !== 0 && game.gameState[y][x] !== undefined) {
        if (typeof game.gameState[y][x] === "number") {
            handleObject(game.gameState[y][x], key, game, y, x)
        } else {
            handleObject(game.gameState[y][x].name, key, game, y, x)
        }
    }

    /* Switch */
    function handleObject(objectName, key, game, y, x) {
        var currentObject = {
            "potion": () => takePotion(key, game, y, x),
            "chest": () => openChest(key, game, y, x),
            "1": () => move(key, game, y , x),
            "default": () => {return}
        }

        currentObject[objectName.toString() || "default"]()
    }
}

/* Move player*/
function move(key, game, y, x) {
    var pickMove = {
        "ArrowUp": () => {
            game.gameState[y][x] = game.player
            game.gameState[y + 1][x] = 1
        },
        "ArrowDown": () => {
            game.gameState[y][x] = game.player
            game.gameState[y - 1][x] = 1
        },
        "ArrowLeft": () => {
            game.gameState[y][x] = game.player
            game.gameState[y][x + 1] = 1
        },
        "ArrowRight": () => {
            game.gameState[y][x] = game.player
            game.gameState[y][x - 1] = 1
        }
    }
    pickMove[key]()
}

/* Take potion */
function takePotion(key, game, y, x) {

    /* Restore health */
    if (game.player.currentHealth < game.player.maxHealth) {
        game.player.currentHealth = game.player.currentHealth
        + game.potion.restore < game.player.maxHealth
        ? game.player.currentHealth + game.potion.restore
        : game.player.maxHealth
    }

    /* Move */
    move(key, game, y, x)
}

/* Open chest */
function openChest(key, game, y, x) {
    var takeItem = {
        "weapon": () => game.player.currentWeapon += 1,
        "strength": () => {
            game.player.strength += 1
            game.player.attackLow = 4 * game.player.strength
            game.player.attackHigh = 6 * game.player.strength
        },
        "vitality": () => {
            game.player.vitality += 1
            game.player.maxHealth = 100 + (10 * game.player.vitality)
            game.player.currentHealth += 10
        },
        "agility": () => game.player.agility += 1
    }
    takeItem[game.chest.items[Math.floor(Math.random() * 4)]]()

    /* Move */
    move(key, game, y, x)
}

/* Fight */
function fight(key, game, y, x, enemy) {

}
