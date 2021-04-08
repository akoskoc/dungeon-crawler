function giveExperience(game, value, levelUp, monsterName) {
    game.log.unshift(monsterName + " grants " + value * game.level + " experience.")
    game.log.pop()
    game.player.currentExperience + value * game.level < game.player.maxExperience ? game.player.currentExperience += value * game.level : levelUp(game.player, value * game.level)
}

function giveItem(game) {

    var num = Math.floor(Math.random() * game.epicItems.length)



    game.epicItems[num](game)

    /* remove item from possibilities after it has been given */
    game.epicItems = game.epicItems.filter((item) => item !== game.epicItems[num])
}

function levelUp(player, experienceGain) {
    player.maxHealth += 10 * player.level
    player.currentHealth = player.maxHealth
    player.attackLow += 4
    player.attackHigh += 6
    player.currentExperience = (player.currentExperience + experienceGain) - player.maxExperience
    player.maxExperience += 50 * player.level
    player.level += 1
}

export function drop(game, monsterName) {
    for (var item in game[monsterName].dropTable) {
        if (Math.random() <= game[monsterName].dropTable[item].chance/100) {
            var effects = {
                experience: () => {
                    game[monsterName].dropTable.experience.effect(game, giveExperience, levelUp, monsterName)
                },
                item: () => giveItem(game)
            }
            if (game.epicItems.length > 0) {
                effects[item]()
            }
        }
    }

}
