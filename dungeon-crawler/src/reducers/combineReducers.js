import { combineReducers } from 'redux'

/* Reducers */
import game from "./reducerGame"
import maps from "./reducerMaps"
import epicItems from "./reducerEpicItems"
import sprites from "./reducerSprites"

export default combineReducers({
    game,
    maps,
    epicItems,
    sprites
})
