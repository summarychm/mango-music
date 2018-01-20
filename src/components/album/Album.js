import React from 'react';
// import {CSSTransition} from "react-transition-group"

//自行封装的公共组件
import Header from "@/common/header/Header"
import Scroll from "@/common/scroll/Scroll"
import Loading from "@/common/loading/Loading"

//获取专辑详情class对象
import {getAlbumInfo} from "@/api/recommend"
import {getSongVKey} from "@/api/song"
//接口成功状态码
import {CODE_SUCCESS} from "@/api/config"
//专辑类模型
import * as AlbumModel from "../../model/album"
//歌曲类模型
import * as SongModel from "../../model/song"

import "./album.styl";

class Album extends React.Component {
    constructor(props) {
        super(props);
        this._renderData = {};//存放用于展示的数据
        this._refs = {};//存放dom对象
        this.state = {
            loading: true,
            refreshScroll: true,
            album: {},
            songs: []
        };
    }

    componentDidMount() {
        this.initialData();
    }


    render() {
        let {album, songs} = this.state;
        this.renderData(album, songs);
        return (
            <div className="music-album">
                <Header title={album.name} ref={node => this._refs.header = node}/>
                {/*上半部分*/}
                <div style={{position: "relative"}}>
                    <div ref={node => this._refs.albumBg = node}
                        className="album-img"
                        style={{backgroundImage: `url(${album.img})`}}
                    >
                        <div className="filter"></div>
                    </div>
                    <div className="album-img fixed"
                        ref={node => this._refs.albumFixedBg=node}
                        style={{backgroundImage: `url(${album.img})`}}
                    >
                        <div className="filter"></div>
                    </div>
                    <div className="play-wrapper" ref={node => this._refs.playButtonWrapper=node}>
                        <div className="play-button">
                            <i className="icon-play"></i>
                            <span>播放全部</span>
                        </div>
                    </div>
                </div>
                {/*下半部分*/}

                <div className="album-container"ref={node => this._refs.albumContainer=node} >
                    <div className="album-scroll" style={this.state.loading === true ? {display:"none"} : {}}>
                        <Scroll refresh={this.state.refreshScroll} onScroll={this.scroll}>
                            <div className="album-wrapper">
                                <div className="song-count">专辑 共{songs.length}首</div>
                                <div className="song-list">
                                    {this._renderData.songs}
                                </div>
                                <div className="album-info" style={album.desc? {} : {display:"none"}}>
                                    <h1 className="album-title">专辑简介</h1>
                                    <div className="album-desc">
                                        {album.desc}
                                    </div>
                                </div>
                            </div>
                        </Scroll>
                    </div>
                    <Loading title="正在加载..." show={this.state.loading}/>
                </div>
                {/*

                <div className="album-container" ref={node => this._refs.albumContainer=node}>
                    <div className="album-scroll" style={this.state.loading === true ? {display: "none"} : {}}>
                        <Scroll refresh={this.state.refreshScroll} onScroll={this.scroll} >
                            <div className="album-wrapper">
                                <div className="song-count">专辑,共{songs.length}首</div>
                                <div className="song-list">
                                    {this._renderData.songs}
                                </div>
                                <div className="album-info" style={album.desc ? {} : {display: "none"}}>
                                    <h1 className="album-title">专辑简介</h1>
                                    <div className="album-desc">
                                        {album.desc}
                                    </div>
                                </div>
                            </div>
                        </Scroll>
                    </div>
                    <Loading title="正在加载..." show={this.state.loading} />
                </div>*/}
            </div>
        )
    }

    renderData(album, songs) {
        songs = songs && songs.map(song => {
            return (
                <div className="song" key={song.id}>
                    <div className="song-name">{song.name}</div>
                    <div className="song-singer">{song.singer}</div>
                </div>
            );
        });
        this._renderData.songs = songs;
    }

    //初始化数据
    initialData() {
        let albumBgDOM =this._refs.albumBg;
        let albumContainerDOM = this._refs.albumContainer;
        albumContainerDOM.style.top = albumBgDOM.offsetHeight + "px";

        let mid = this.props.match.params.id; //专辑编号
        getAlbumInfo(mid).then(res => {
            if (!res || res.code !== CODE_SUCCESS) {
                console.log("获取专辑详情失败.", res);
            }
            return res.data;
        }).then(data => {
            //获取专辑对象
            let album = AlbumModel.createAlbumByDetail(data);
            let songList = data.list;
            let songs = [];
            for (let item of songList) {
                let song = SongModel.createSong(item);
                //获取歌曲vkey
                this.getSongUrl(song, item.songmid);
                songs.push(song);
            }
            return {songs: songs, album: album}
        }).then(obj => {
            // console.log(this);
            this.setState({
                loading: false,
                album: obj.album,
                songs: obj.songs
            }, () => {
                // console.log("刷新");
                // 通知better-scroll刷新
                this.setState({refreshScroll: true})
            });
        })
    }

    /**
     * 监听scroll
     */
    scroll = ({y}) => {
        let albumBgDOM = this._refs.albumBg;
        let albumFixedBgDOM = this._refs.albumFixedBg;
        let playButtonWrapperDOM =this._refs.playButtonWrapper;
        if (y < 0) {
            if (Math.abs(y) + 55 > albumBgDOM.offsetHeight) {
                albumFixedBgDOM.style.display = "block";
            } else {
                albumFixedBgDOM.style.display = "none";
            }
        } else {
            let transform = `scale(${1 + y * 0.004}, ${1 + y * 0.004})`;
            albumBgDOM.style["webkitTransform"] = transform;
            albumBgDOM.style["transform"] = transform;
            playButtonWrapperDOM.style.marginTop = `${y}px`;
        }
    }

    getSongUrl(song, mId) {
        getSongVKey(mId).then((res) => {
            if (res) {
                if (res.code === CODE_SUCCESS) {
                    if (res.data.items) {
                        let item = res.data.items[0];
                        song.url = `http://dl.stream.qqmusic.qq.com/${item.filename}?vkey=${item.vkey}&guid=3655047200&fromtag=66`
                    }
                }
            }
        });
    }


}

export default Album;

