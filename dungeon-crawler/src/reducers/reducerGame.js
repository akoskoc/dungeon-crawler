import data from "./../data/data"


export default function gameReducer(state = data.game, action) {
    switch(action.type) {

        /* Init */
        case "SET_GAME_STATE":
            return Object.assign({}, state, {
                gameState: action.payload,
                player: Object.assign({}, state.player, {
                    isAlive: true
                })
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
        handleObject(game.gameState[y][x], key, game, y, x)
    }

    /* Switch */
    function handleObject(object, key, game, y, x) {
        var currentObject = {
            "skeleton": () => fight(game, y, x, object),
            "bat": () => fight(game, y, x, object),
            "miniboss": () => fight(game, y, x, object),
            "1": () => move(key, game, y, x),
            "potion": () => takePotion(key, game, y, x),
            "chest": () => openChest(key, game, y, x),
            "default": () => {return}
        }
        if (typeof object === "number") {
            currentObject[object.toString() || "default"]()
        } else {
            currentObject[object.name.toString() || "default"]()
        }
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
        "weapon": () => game.player.currentWeapon < 4
            ? game.player.currentWeapon += 1
            : game.player.currentWeapon,
        "strength": () => {
            game.player.strength += 1
            game.player.attackLow = 4 * game.player.strength
            game.player.attackHigh = 6 * game.player.strength
        },
        "vitality": () => {
            game.player.vitality += 1
            game.player.maxHealth = 100 + (20 * game.player.vitality)
            game.player.currentHealth += 20
        },
        "agility": () => game.player.agility += 1
    }
    takeItem[game.chest.items[Math.floor(Math.random() * 4)]]()

    /* Move */
    move(key, game, y, x)
}

/* Fight */
/* NEED TO APPLY EPIC ITEMS SOMEHOW TO THE PLAYER */
function fight(game, y, x, enemy) {
    /* Player attacks the enemy */
    /* Todo: vampirism, double attack, poison, if etc */
    var playerDamage = game.player.items.weapon[game.player.currentWeapon]
    + Math.floor(Math.random()
    * ((game.player.attackHigh + 1) - game.player.attackLow))
    + game.player.attackLow
    enemy.currentHealth -= playerDamage

    if (enemy.currentHealth > 0) {
        /* Enemy attacks the player */
        /* Todo: dodge, damage reduction, if etc, is player dead */
        var enemyDamage = Math.floor(Math.random() * ((enemy.attackHigh + 1) - enemy.attackLow)) + enemy.attackLow
        if (Math.random() <= game.player.dodge/100) {
            return
        } else {
            game.player.currentHealth -= Math.floor(enemyDamage * ( 1 - game.player.damageReduction/100)) !== 0 ? Math.floor(enemyDamage * ( 1 - game.player.damageReduction/100)) : enemyDamage

            console.log(game.player.currentHealth)
            if (game.player.currentHealth <= 0) {
                game.player.isAlive = false
            }
        }


    } else {
        /* Enemy dies */
        var enemies = {
            "bat": () => {
                game.player.currentExperience + 20 * game.level < game.player.maxExperience ? game.player.currentExperience += 20 : levelUp(game.player, 20)
            },
            "skeleton": () => {
                game.player.currentExperience + 30 * game.level < game.player.maxExperience ? game.player.currentExperience += 30 : levelUp(game.player, 30)
            },
            "miniboss": () => {
                game.player.currentExperience + 50 * game.level < game.player.maxExperience ? game.player.currentExperience += 50 : levelUp(game.player, 50)
            }
        }
        enemies[enemy.name]()
        game.gameState[y][x] = 1
    }


    /* Level up */
    function levelUp(player, experienceGain) {
        player.maxHealth += 10 * player.level
        player.currentHealth = player.maxHealth
        player.attackLow += 4
        player.attackHigh += 6
        player.currentExperience = player.maxExperience - (player.currentExperience + experienceGain)
        player.maxExperience += 50 * player.level
        player.level += 1
    }
}
