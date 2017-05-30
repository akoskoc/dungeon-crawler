const data = {
    game: {
        size: 400,
        gameState: [],
        skeletons: 3,
        bats: 8,
        chests: 4,
        potions: 7,
        level: 0
    },
    character: {
        health: 100,
        attack: 8-12,
        vision: 5,
        vitality: 0,
        strength: 0,
        agility: 0,
        speed: 1
    },
    skeleton: {
        health: 60,
        attack: 8-12
    },
    bat: {
        health: 40,
        attack: 6-8
    },
    potion: {
        restore: 40-60
    },
    chest: {
        vitality: 1,
        strength: 1,
        agility: 1,
        attack: 4-6,
        epicItems: {
            plateArmor: {
                effect: "20% damage reduction",
                slot: "chest"
            },
            leatherArmor: {
                effect: "20% chance to dodge",
                slot: "chest"
            },
            minerHelmet: {
                effect: "increase vision by 3 tiles",
                slot: "helmet"
            },
            plateHelmet: {
                effect: "20% damage reduction",
                slot: "helmet"
            },
            swiftBoots: {
                effect: "Run like the wind",
                slot: "boots"
            },
            swiftGloves: {
                effect: "50% chance to double attack",
                slot: "gloves"
            },
            vampireEnchantment: {
                effect: "50% of damage dealt is leeched back as life",
                slot: "enchantment"
            },
            poisionEnchantment: {
                effect: "reduce the damage your enemy deals to you by 20%",
                slot: "enchantment"
            }
        }
    },
    maps: {
        level1: [
    [2, 2, 3, 2, 2, 2, 2, 2, 3, 2, 2, 2, 2, 2, 2, 3, 2, 2, 2, 2, 2, 3, 2, 2, 2],
    [2, 1, 1, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
    [2, 1, 1, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
    [2, 1, 1, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
    [2, 1, 1, 1, 1, 1, 5, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 3, 2, 2, 2],
    [3, 1, 1, 1, 1, 1, 2, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 1, 1, 1, 3],
    [2, 2, 2, 2, 2, 2, 3, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 3, 1, 1, 1, 1, 2],
    [2, 0, 0, 0, 0, 0, 0, 0, 2, 2, 1, 3, 2, 0, 0, 0, 1, 1, 1, 5, 1, 1, 1, 1, 2],
    [2, 0, 0, 0, 0, 0, 0, 0, 2, 1, 1, 1, 2, 0, 0, 0, 1, 0, 0, 3, 1, 1, 1, 1, 2],
    [2, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0, 0, 0, 1, 0, 0, 2, 1, 1, 1, 1, 2],
    [2, 0, 1, 0, 0, 0, 0, 0, 3, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 2, 3, 2, 2, 2, 2],
    [2, 0, 1, 0, 0, 0, 0, 0, 2, 2, 1, 2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
    [2, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
    [2, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
    [2, 3, 5, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
    [2, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
    [2, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
    [3, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 5, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3],
    [2, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
    [2, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
    [2, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
    [2, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
    [2, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
    [2, 4, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
    [2, 2, 3, 2, 2, 2, 2, 2, 3, 2, 2, 2, 2, 2, 2, 3, 2, 2, 2, 2, 2, 3, 2, 2, 2]
]
    }
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
