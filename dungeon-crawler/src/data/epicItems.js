const epicItems = [
    (game) => {
        /* LOG */
        game.log.unshift("You've found a plate helmet. +5% damage reduction.")
        game.log.pop()
        game.player.damageReduction += 5
    },
    (game) => {
        /* LOG */
        game.log.unshift("You've found a body armor. +5% damage reduction.")
        game.log.pop()
        game.player.damageReduction += 5
    },
    (game) => {
        /* LOG */
        game.log.unshift("You've found a plate boots. +5% damage reduction.")
        game.log.pop()
        game.player.damageReduction += 5
    },

    (game) => {
        /* LOG */
        game.log.unshift("Your vision has been increased.")
        game.log.pop()
        game.player.vision += 1
    },
    (game) => {
        /* LOG */
        game.log.unshift("Your vision has been increased.")
        game.log.pop()
        game.player.vision += 1
    },
    (game) => {
        /* LOG */
        game.log.unshift("Your vision has been increased.")
        game.log.pop()
        game.player.vision += 1
    },

    (game) => {
        /* LOG */
        game.log.unshift("Fighting made you agile giving you 10% dodge chance.")
        game.log.pop()
        game.player.dodge += 10
    },

    (game) => {
        /* LOG */
        game.log.unshift("Slaying monsters gave your weapon vampire enchantment.")
        game.log.pop()
        game.player.lifeSteal = true
    },

    (game) => {
        /* LOG */
        game.log.unshift("You've became a swordsman, 50% chance to double attack.")
        game.log.pop()
        game.player.doubleAttack = true
    }

]

export default epicItems
