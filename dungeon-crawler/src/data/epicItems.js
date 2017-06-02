const epicItems = [
    (game) => game.player.damageReduction += 5,
    (game) => game.player.damageReduction += 5,
    (game) => game.player.damageReduction += 5,

    (game) => game.player.vision += 1,
    (game) => game.player.vision += 1,
    (game) => game.player.vision += 1,

    (game) => game.player.dodge += 10,

    (game) => game.player.lifeSteal = true,

    (game) => game.player.doubleAttack = true

]

export default epicItems
