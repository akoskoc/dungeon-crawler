import { combineReducers } from 'redux'
import gameReducer from "./gameReducer"
import characterReducer from "./characterReducer"

export default combineReducers({
    game: gameReducer,
    character: characterReducer
})
