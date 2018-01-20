const URL = {
    /*推荐轮播*/
    carousel: "https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg",
    /*最新专辑*/
    newalbum: "https://u.y.qq.com/cgi-bin/musicu.fcg",
    /*专辑信息*/
    albumInfo: "https://c.y.qq.com/v8/fcg-bin/fcg_v8_album_info_cp.fcg",
    /*歌曲vkey*/
    songVkey: "https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg"
};

//JSONP方法参数配置
const PARAM = {
    format: "JSONP",
    inCharset: "utf-8",
    outCharset: "utf-8",
    notice: 0
};
//JSONP回调方法设置
const OPTION = {
    param: "jsonpCallback",
    prefix: "callback"
};

//回调状态值设定
const CODE_SUCCESS = 0;

export {URL, PARAM, OPTION, CODE_SUCCESS};













