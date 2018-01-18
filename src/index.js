import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

/*
class Child extends React.Component{
    render(){
        return(<div>ChildText</div>)
    }
}

class App extends React.Component {
    render() {
        return (
            <div>
                <div ref={div => {
                    this._div = div
                }}>app
                </div>
                <Child ref={child => this._child = child}/>
                <button onClick={()=> {
                    console.log(this._div);
                    console.log(this._child);
                    console.log(ReactDOM.findDOMNode(this._div) === this._div);
                    console.log(ReactDOM.findDOMNode(this._child));
                }}>log refs
                </button>
            </div>

        )
    }
}
ReactDOM.render(<App/>,document.querySelector("#root"));
*/

