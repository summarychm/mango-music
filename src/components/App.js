import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    NavLink,
    Redirect
} from 'react-router-dom';

import Recommend from "./recommend/Recommend"
import Ranking from "./ranking/Ranking"
import Search from "./search/Search"
import logo from '../assets/imgs/logo.png';
import '../assets/stylus/reset.styl';
import './App.styl';

export default class App extends React.Component {
    render() {
        return (
            <Router>
                <div className="app">
                    <header className="app-header">
                        <img src={logo} alt="logo" className="app-logo"/>
                        <h1 className="app-title">芒果 Music</h1>
                    </header>
                    {/*顶部tab选择*/}
                    <div className="music-tab">
                        <div className="tab-item">
                            <NavLink to="/recommend" className="nav-link">
                                <span>推荐</span>
                            </NavLink>
                        </div>
                        <div className="tab-item">
                            <NavLink to="/ranking" className="nav-link">
                                <span>排行榜</span>
                            </NavLink>
                        </div>
                        <div className="tab-item">
                            <NavLink to="/search" className="nav-link">
                                <span>搜索</span>
                            </NavLink>
                        </div>
                    </div>
                    {/*顶部tabSwitch*/}
                    <div className="music-view">
                        <Switch>
                            <Route path={"/recommend"} component={Recommend}/>
                            <Route path={"/ranking"} commponent={Ranking}/>
                            <Route path={'/search'} component={Search}/>
                            <Redirect from="/" to="/recommend" />
                        </Switch>
                    </div>
                </div>
            </Router>
        );
    }
}
