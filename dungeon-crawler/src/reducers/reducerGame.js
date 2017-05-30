import data from "./../data/data"


export default function gameReducer(state = data.game, action) {
    switch(action.type) {
        case "SET_GAME_STATE":
            return Object.assign({}, state, {
                gameState: action.payload
            })
            break
    }
    return state
}
