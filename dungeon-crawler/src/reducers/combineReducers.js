import { combineReducers } from 'redux'

/* Reducers */
import game from "./reducerGame"
import character from "./reducerCharacter"
import bat from "./reducerBat"
import chest from "./reducerChest"
import potion from "./reducerPotion"
import skeleton from "./reducerSkeleton"

export default combineReducers({
    game,
    character,
    bat,
    chest,
    potion,
    skeleton
})
