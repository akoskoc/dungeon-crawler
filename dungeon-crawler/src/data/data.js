import maps from "./maps"
import epicItems from "./epicItems"
import sprites from "./sprites"

const data = {
    game: {
        size: 400,
        gameState: [],
        skeletons: 3,
        bats: 8,
        chests: 4,
        potions: 7,
        level: 0,
        player: {
            maxHealth: 100,
            currentHealth: 100,
            attack: 8-12,
            vision: 5,
            vitality: 0,
            strength: 0,
            agility: 0,
            speed: 1
        },
        potion: {
            restore: 40
        }
    },
    skeleton: {
        health: 60,
        attack: 8-12
    },
    bat: {
        health: 40,
        attack: 6-8
    },
    chest: {
        vitality: 1,
        strength: 1,
        agility: 1,
        attack: 4-6,
    },
    epicItems,
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
