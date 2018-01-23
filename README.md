# 一款React云音乐APP - 芒果音乐

## 线上测试地址

[http://mango-music.netlify.com](http://mango-music.netlify.com)

## APP主要页面及页面主要功能.
* 推荐页:轮播推荐,最新专辑列表.  
* 排行榜与排行详情页:各大排行榜列表,排行榜详情展示.
* 歌手列表与详情页:可按照歌手类别和名称检索歌手.
* 搜索页:支持按歌曲,歌手,专辑搜索,抓取用户热门搜索数据.
* 音乐播放页:分为音乐播放页和底部音乐播放组件2个模块.

## 主要使用的技术及所涉及的功能   
* 使用react-router进行路由配置(v4版)
* 使用redux+react-redux实现状态管理.
* 使用jsonp获取所需数据,
* 使用swiper开发轮播组件.
* 使用better-scroll配合react-lazyload实现滑动懒加载.
* 使用react-transition-group进行c3动画效果制作.
* 使用stylus处理css.
* 使用redux存储用户播放清单,当前播放状态,当前曲目等信息.