import React from 'react';

//自行封装的公共组件
import Header from "@/common/header/Header"
import Scroll from "@/common/scroll/Scroll"
import Loading from "@/common/loading/Loading"

//获取专辑详情class对象
import {getAlbumInfo} from "@/api/recommend"
//接口成功状态码
import {CODE_SUCCESS} from "@/api/config"
//专辑类模型
import * as AlbumModel from "../../model/Album"
//歌曲类模型
import * as SongModel from "../../model/Song"


import "./album.styl";

class Album extends React.Component {
    constructor(props) {
        super(props);
        this._renderData = {};
        this._refs = {};
        this.state = {
            loading: true,
            refreshScroll: false,
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
                    <div
                        className="album-img"
                        style={{backgroundImage: `url(${album.img})`}}
                        ref={node => this._refs.albumBg = node}
                    >
                        <div className="filter"></div>
                    </div>
                    <div
                        className="album-img fixed"
                        ref={node => this._refs.albumFixedBg}
                        style={{backgroundImage: `url(${album.img}`}}
                    >
                        <div className="filter"></div>
                    </div>
                    <div
                        className="play-wrapper"
                        ref={node => this._refs.playButtonWrapper}
                    >
                        <div className="paly-button">
                            <i className="icon-play"></i>
                            <span>播放全部</span>
                        </div>
                    </div>
                </div>
                <div
                    className="album-container"
                    ref={node => this._refs.albumContainer}
                >
                    <div
                        className="album-scroll"
                        style={this.state.loading === true ? {display: "none"} : {}}
                    >
                        <Scroll refresh={this.state.refreshScroll}>
                            <div className="album-wrapper">
                                <div className="song-count">专辑,共{songs.length}</div>
                                <div className="song-list">
                                    {this._renderData.songs}
                                </div>
                                <div
                                    className="album-info"
                                    style={album.desc ? {} : {display: "none"}}
                                >
                                    <h1 className="album-title">专辑简介</h1>
                                    <div className="album-desc">
                                        {album.desc}
                                    </div>
                                </div>
                            </div>
                        </Scroll>
                    </div>
                    <Loading
                        title="正在加载..."
                        show={this.state.loading}
                    />
                </div>
            </div>
        )
    }

    renderData(album, songs) {
        songs = songs.map(song => {
            return (
                <div className="song" key={song.id}>
                    <div className="song-name">{song.name}</div>
                    <div className="song-singer">{song.singer}</div>
                </div>
            )
        });
        this._renderData.songs = songs;
    }

    //初始化数据
    initialData() {
        let mid = this.props.match.params.id; //专辑编号
        getAlbumInfo(mid).then(res => {
            if (!res || res.code !== CODE_SUCCESS) {
                console.log("获取专辑详情失败.", res);
            }
            return res.data;
        }).then(data => {
            let album = AlbumModel.createAlbumByDetail(data);
            let songList = data.list;
            let songs = [];
            for (let item of songList) {
                let song = SongModel.createSong(item);
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
                this.setState({refreshScroll: true})
            });
        })
    }


}

export default Album;

