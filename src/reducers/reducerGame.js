import data from "./../data/data"
import { drop } from "./helpers/drop"


export default function gameReducer(state = data.game, action) {
    switch(action.type) {

        /* Init */
        case "SET_GAME_STATE":
            return Object.assign({}, state, {
                gameState: action.payload,
                player: Object.assign({}, state.player, {
                    isAlive: true
                }),
                currentLevel: state.level
            })
            break

        /* Player input */
        case "PLAYER_ROUND":
            return Object.assign({},
                handlePlayerMove(state,  action.payload)
            )
            break

        /* Reset game on player death */
        case "PLAYER_DEATH":
            return Object.assign({}, state, {
                won: false,
                Boss: {
                    name: "Boss",
                    health: 700,
                    currentHealth: 700,
                    attackLow: 40,
                    attackHigh: 50,
                    number: 0
                },
                gameState: [],
                level: 1,
                currentLevel: 1,
                player: Object.assign({}, data.game.player)

            })
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
            "1": () => move(key, game, y, x),
            "2": () => portal(game),
            "Skeleton": () => fight(game, y, x, object),
            "Bat": () => fight(game, y, x, object),
            "Werewolf": () => fight(game, y, x, object),
            "Boss": () => fight(game, y, x, object),
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
        var restore = Math.floor((Math.random()* 5) + (Math.floor(game.potion.restore * ( 0.75 + game.level / 4 ))))

        /* LOG */
        game.log.unshift("Healing potion restored " +
        (game.player.maxHealth - game.player.currentHealth >= restore ? restore : game.player.maxHealth - game.player.currentHealth)
         + " life.")

        game.player.currentHealth = game.player.currentHealth
        + restore < game.player.maxHealth
        ? game.player.currentHealth + restore
        : game.player.maxHealth
        game.log.pop()

    } else {

        /* LOG */
        game.log.unshift("Healing potion restored " + 0
         + " life.")
        game.log.pop()
    }

    /* Move */
    move(key, game, y, x)
}

/* Open chest */
function openChest(key, game, y, x) {
    var takeItem = {
        "weapon": () => {
            if (game.player.currentWeapon < 3) {
                /* LOG */
                game.log.unshift("Your weapon has been upgraded.")
                game.log.pop()
                game.player.currentWeapon += 1
            } else {
                /* LOG */
                game.log.unshift("Your weapon is fully upgraded, better luck next time.")
                game.log.pop()
                game.player.currentWeapon = 3
            }

        },
        "strength": () => {
            /* LOG */
            game.log.unshift("You've found a potion of strength. Attack increased.")
            game.log.pop()
            game.player.attackLow += 2
            game.player.attackHigh += 4
        },
        "vitality": () => {
            /* LOG */
            game.log.unshift("You've found a potion of vitality. + 20 health.")
            game.log.pop()
            game.player.maxHealth += 20
            game.player.currentHealth += 20
        },
        "agility": () => {
            /* LOG */
            game.log.unshift("You've found a potion of agility. + 2% dodge chance.")
            game.log.pop()
            game.player.dodge += 2
        }
    }
    takeItem[game.chest.items[Math.floor(Math.random() * 4)]]()

    /* Move */
    move(key, game, y, x)
}

/* Fight */
function fight(game, y, x, enemy) {
    /* Player attacks the enemy */
    var playerDamage = game.player.items.weapon[game.player.currentWeapon]
    + Math.floor(Math.random()
    * ((game.player.attackHigh + 1) - game.player.attackLow))
    + game.player.attackLow



    /* Damage to enemy */
    enemy.currentHealth -= playerDamage

    /* LOG */
    var playerDamageLog = "You hit " + enemy.name + " for " + playerDamage + " damage"

    /* LifeSteal */
    if (game.player.lifeSteal) {

        /* LOG */
        playerDamageLog = playerDamageLog.concat(" and steal " +
        (Math.floor(playerDamage/4) + game.player.currentHealth <= game.player.maxHealth ? Math.floor(playerDamage/4) : game.player.maxHealth - game.player.currentHealth)
        + " life")

        game.player.currentHealth = game.player.currentHealth + Math.floor(playerDamage/4) <= game.player.maxHealth ? game.player.currentHealth + Math.floor(playerDamage/4) : game.player.maxHealth



    }

    /* LOG */
    game.log.unshift(playerDamageLog.concat("."))
    game.log.pop()


    /* Double attack */
    if (game.player.doubleAttack && Math.floor(Math.random() * 2) > 0) {
        enemy.currentHealth -= playerDamage

        /* LOG */
        playerDamageLog = "You double attack " + enemy.name + " for " + playerDamage + " damage"

        if (game.player.lifeSteal) {

            /* LOG */
            playerDamageLog = playerDamageLog.concat(" and steal " +
            (Math.floor(playerDamage/4) + game.player.currentHealth <= game.player.maxHealth ? Math.floor(playerDamage/4) : game.player.maxHealth - game.player.currentHealth)
            + " life")

            game.player.currentHealth = game.player.currentHealth + Math.floor(playerDamage/4) <= game.player.maxHealth ? game.player.currentHealth + Math.floor(playerDamage/4) : game.player.maxHealth
        }

        /* LOG */
        game.log.unshift(playerDamageLog.concat("."))
        game.log.pop()
    }

    /* If enemy did'nt die, it deals damage */
    if (enemy.currentHealth > 0) {
        /* Enemy attacks the player */
        var enemyDamage = Math.floor(Math.random() * ((enemy.attackHigh + 1) - enemy.attackLow)) + enemy.attackLow

        if (Math.random() <= game.player.dodge/100) {
            /* Attack dodged */
            /* LOG */
            game.log.unshift("You dodged " + enemy.name + "'s attack.")
            game.log.pop()
            return
        } else {
            /* Enemy attack, damage redu caluclated here aswell */
            game.player.currentHealth -= Math.floor(enemyDamage * ( 1 - game.player.damageReduction/100)) !== 0 ? Math.floor(enemyDamage * ( 1 - game.player.damageReduction/100)) : enemyDamage

            game.log.unshift(enemy.name + " deals " +
            (Math.floor(enemyDamage * ( 1 - game.player.damageReduction/100)) !== 0 ? Math.floor(enemyDamage * ( 1 - game.player.damageReduction/100)) : enemyDamage)
            + " damage to you.")
            game.log.pop()

            /* Player dies */
            if (game.player.currentHealth <= 0) {
                game.log.unshift(enemy.name + " killed you.")
                game.log.pop()
                game.player.isAlive = false
            }
        }
    } else {
        var enemies = {
            "Bat": () => drop(game, "Bat"),
            "Skeleton": () => drop(game, "Skeleton"),
            "Werewolf": () => drop(game, "Werewolf")
        }
        if (enemy.name !== "Boss") {
            /* Enemy dies */
            game.gameState[y][x] = 1
            /* Enemy drops exp and items */
            enemies[enemy.name]()
        } else {
            /* Won */
            game.won = true
        }

    }

}

/* Portal to new level */
function portal(game) {
    var miniboss = false
    for (var i = 0; i < game.gameState.length; i += 1) {
        for (var k = 0; k < game.gameState[i].length; k += 1) {
            if (typeof game.gameState[i][k] === "object") {
                if (game.gameState[i][k].name === "Werewolf") {
                    miniboss = true
                }
            }
        }
    }
    if (!miniboss) {
        if (game.level === 4) {
            game.Boss.number += 1
        }
        game.level += 1
    } else {
        /* LOG */
        game.log.unshift("Find and eliminate the Werewolf to go to the next level.")
        game.log.pop()
    }
}
