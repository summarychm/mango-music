import React from 'react';

import logo from '../assets/imgs/logo.png';
import '../assets/stylus/reset.styl';
import './App.styl';

export default class App extends React.Component {
    render() {
        return (
            <div className="App">
                <header className="app-header">
                    <img src={logo} alt="logo" className="app-logo"/>
                    <h1 className="app-title">Mongo Music</h1>
                </header>
                <div className="music-tab">
                    <div className="tab_item selected">
                        <span>推荐</span>
                    </div>
                    <div className="tab_item">
                        <span>排行榜</span>
                    </div>
                    <div className="tab_item">
                        <span>搜索</span>
                    </div>
                </div>
            </div>
        );
    }
}
