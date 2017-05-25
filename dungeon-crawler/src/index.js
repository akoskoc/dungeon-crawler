import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class App extends React.Component {
    render() {
        return(
            <canvas></canvas>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
