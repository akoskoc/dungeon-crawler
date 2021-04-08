import { combineReducers } from 'redux'

/* Reducers */
import game from "./reducerGame"
import maps from "./reducerMaps"
import sprites from "./reducerSprites"

export default combineReducers({
    game,
    maps,
    sprites
})
