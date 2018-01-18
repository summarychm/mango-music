import React from 'react';

import Swiper from "swiper"
import "swiper/dist/css/swiper.css"

import {getCarousel, getNewAlbum} from "@/api/recommend"
import {CODE_SUCCESS} from "@/api/config"
import * as AlbumModel from "@/model/album";
import Scroll from "@/common/scroll/Scroll";

import './recommend.styl';

export default class Recommend extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sliderList: [],
            newAlbums: [],
            refreshScroll: false
        }
    }

    componentDidMount() {
        this.initialData();
    }

    initialData = () => {
        //轮播图
        getCarousel().then(res => {
            //console.log("获取轮播:");
            if (!res || res.code !== CODE_SUCCESS)
                return;
            res.data && this.setState({
                sliderList: res.data.slider
            }, () => {
                //创建swiper
                this.sliderSwiper = new Swiper(".slider-container"), {
                    loop: true,
                    autoplay: 1000 * 3,
                    autoplayDisableOnInteraction: false,
                    pagination: '.swiper-pagination'
                }
            });
        });
        //最新专辑
        getNewAlbum().then((res) => {
            if (!res || res.code !== CODE_SUCCESS || !res.albumlib.data) {
                // console.log("获取最新专辑：");
                console.error(res);
                return;
            }

            let albumList = res.albumlib.data.list;
            //根据上架时间降序排列
            albumList.sort((a, b) => {
                return new Date(b.public_time).getTime() - new Date(a.public_time).getTime();
            });
            this.setState({
                newAlbums: albumList
            }, () => {
                this.setState({
                    refreshScroll: true
                })
            });
        });
    }

    toLink(linkUrl) {
        /*使用闭包把参数变为局部变量使用*/
        return () => {
            window.location.href = linkUrl
        }
    }

    render() {
        let carouselData = this.state.sliderList.map(slider => {
            return (
                <div className="swiper-slide" key={slider.id}>
                    <a href="#"
                       className="slider-nav"
                       onClick={this.toLink(slider.linkUrl)}
                    >
                        <img src={slider.picUrl} alt="推荐"
                             width="100%" height="100%"/>
                    </a>
                </div>
            )
        });
        let albums = this.state.newAlbums.map(item => {
            //通过函数创建专辑对象
            let album = AlbumModel.createAlbumByList(item);
            return (
                <div className="album-wrapper" key={album.mId}>
                    <div className="left">
                        <img src={album.img} alt={album.name}
                             width="100%" height="100%"
                        />
                    </div>
                    <div className="right">
                        <div className="album-name">
                            {album.name}
                        </div>
                        <div className="singer-name">
                            {album.singer}
                        </div>
                        <div className="public—time">
                            {album.publicTime}
                        </div>
                    </div>
                </div>
            );
        });
        return (
            <div className="music-recommend">
                <Scroll refresh={this.state.refreshScroll}>
                    <div>
                        <div className="slider-container">
                            <div className="swiper-wrapper">
                                {carouselData}
                            </div>
                            <div className="swiper-pagination"></div>
                        </div>
                        <div className="album-container">
                            <h1 className="title">最新专辑</h1>
                            <div className="album-list">
                                {albums}
                            </div>
                        </div>
                    </div>
                </Scroll>
            </div>
        )
    }
}