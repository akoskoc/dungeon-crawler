import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from "react-redux"
import { createStore } from "redux"
import './styles/main.css'


/* Reducer */
import reducer from "./reducers/combineReducers"

/* Components */
import CanvasComponent from "./components/canvas"
import StatsComponent from "./components/stats"

const store = createStore(reducer);


class App extends React.Component {
    render() {
        return(
            <div>
                <StatsComponent />
                <CanvasComponent />
            </div>
        )
    }
}

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
