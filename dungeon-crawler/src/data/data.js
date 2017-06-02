import maps from "./maps"
import epicItems from "./epicItems"
import sprites from "./sprites"

const data = {
    game: {
        size: 400,
        gameState: [],
        skeleton: {
            name: "skeleton",
            health: 60,
            currentHealth: 60,
            attackLow: 6,
            attackHigh: 8,
            number: 3,
            dropTable: {
                experience: {
                    effect: (game, giveExperience, levelUp) => {
                        giveExperience(game, 30, levelUp)
                    },
                    chance: 100
                },
                item: {
                    effect: (game, giveItem) => {
                        giveItem(game)
                    },
                    chance: 2
                }
            }
        },
        bat: {
            name: "bat",
            health: 40,
            currentHealth: 40,
            attackLow: 4,
            attackHigh: 6,
            number:8,
            dropTable: {
                experience: {
                    effect: (game, giveExperience, levelUp) => {
                        giveExperience(game, 20, levelUp)
                    },
                    chance: 100
                },
                item: {
                    effect: (game, giveItem) => {
                        giveItem(game)
                    },
                    chance: 2
                }
            }
        },
        miniboss: {
            name: "miniboss",
            health: 100,
            currentHealth: 100,
            attackLow: 10,
            attackHigh: 14,
            number: 1,
            dropTable: {
                experience: {
                    effect: (game, giveExperience, levelUp) => {
                        giveExperience(game, 50, levelUp)
                    },
                    chance: 100
                },
                item: {
                    effect: (game, giveItem) => {
                        giveItem(game)
                    },
                    chance: 100
                }
            }
        },
        finalboss: {
            name: "finalboss",
            health: 100,
            currentHealth: 100,
            attackLow: 10,
            attackHigh: 14,
            number: 0
        },
        chest: {
            name: "chest",
            items: [
                "vitality",
                "strength",
                "agility",
                "weapon"
            ],
            number:4
        },
        potion: {
            name: "potion",
            restore: 40,
            number:7
        },
        player: {
            name: "player",
            maxHealth: 100,
            currentHealth: 100,
            attackLow: 0,
            attackHigh: 2,
            currentWeapon: 0,
            vision: 4,
            vitality: 0,
            strength: 0,
            agility: 0,
            number: 1,
            level: 1,
            currentExperience: 0,
            maxExperience: 100,
            damageReduction: 0,
            dodge: 0,
            lifeSteal: true,
            doubleAttack: true,
            isAlive: true,
            "items": {
                "weapon": [
                    10,
                    15,
                    20,
                    25
                ]
            }
        },
        epicItems,
        level: 1
    },
    maps,
    sprites
}

export default data




/*
0 = dirt
1 = floor
2 = wall
3 = wall + torch
4 = floor + portal


*/
/*
-basic stats:
    vitality: increase health by 10
    strength: increase attack by 4-6
    agility: increse dodge change by 10% up to a maximum of 30%

level increase:
    -there are going to be 5 levels of dungeons
        -not sure if im gonna make them or randomly generated, maybe only the map is gonnabe premade
    -every level is gonna increase the stats of the monsters
    -player and monster level increase are going to be very similar
    -every level gonna have a boss monster that you have to defeat and is gonna drop a random epic item
*/
