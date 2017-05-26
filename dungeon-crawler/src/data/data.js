const data = {
    game: {
        viewSize: 320,
        mapSize: 60,
        noEnemies: 10,
        noChests: 10,
        potions: 10,
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
                effect: "20% damage reduction"
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
    }
}

export default data
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
