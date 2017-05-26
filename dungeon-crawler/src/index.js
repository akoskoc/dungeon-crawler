import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from "react-redux"
import { createStore } from "redux"
import './styles/main.css'


/* Reducer */
import reducer from "./reducers/combineReducers"

/* Components */
import CanvasComponent from "./components/canvas"

const store = createStore(reducer);


class App extends React.Component {
    render() {

        return(
            <CanvasComponent />
        )
    }
}

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
