import { combineReducers } from 'redux'

/* Reducers */
import game from "./reducerGame"
import bat from "./reducerBat"
import chest from "./reducerChest"
import skeleton from "./reducerSkeleton"
import maps from "./reducerMaps"
import epicItems from "./reducerEpicItems"
import sprites from "./reducerSprites"

export default combineReducers({
    game,
    bat,
    chest,
    skeleton,
    maps,
    epicItems,
    sprites
})
