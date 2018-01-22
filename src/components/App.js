import React from "react"
import {BrowserRouter as Router, Route, Switch, Redirect, NavLink} from "react-router-dom"
//推荐页
import Recommend from "./recommend/Recommend"
//排行榜
import Ranking from "./ranking/Ranking"
//歌手列表
import SingerList from "./singer/SingerList"
//搜索页
import Search from "../containers/Search"
//播放页
import MusicPlayer from "./play/MusicPlayer"

import logo from "../assets/imgs/logo.png"
import "../assets/stylus/reset.styl"
import "../assets/stylus/font.styl"
import "./App.styl"

class App extends React.Component {
  render() {
    return (
        <Router>
          <div className="app">
              {/*头部logo*/}
              <header className="app-header">
              <img src={logo} className="app-logo" alt="logo" />
              <h1 className="app-title">Mango Music</h1>
            </header>
            {/*选项卡tab切换*/}
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
                <NavLink to="/singer" className="nav-link">
                  <span>歌手</span>
                </NavLink>
              </div>
              <div className="tab-item">
                <NavLink to="/search" className="nav-link">
                  <span>搜索</span>
                </NavLink>
              </div>
            </div>
            {/*路由规则匹配展示*/}
            <div className="music-view">
              {/*
                Switch组件用来选择最近的一个路由，否则最后一个没有指定path的路由也会显示
                Redirect重定向到列表页
              */}
              <Switch>
                <Route path="/recommend" component={Recommend} />
                <Route path="/ranking" component={Ranking} />
                <Route path="/singer" component={SingerList} />
                <Route path="/search" component={Search} />
                <Redirect from="/" to="/recommend" />
                {/*默认路由,可省*/}
                <Route component={Recommend} />
              </Switch>
            </div>
            <MusicPlayer/>
          </div>
        </Router>
    );
  }
}

export default App;
