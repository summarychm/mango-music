/**
 *  专辑类模型
 */
export class Album {
    constructor(id, mId, name, img, singer, publicTime,desc="") {
        this.id = id;
        this.mId = mId;//专辑id
        this.name = name;//专辑名称
        this.img = img;//专辑封面
        this.singer = singer;//歌手
        this.publicTime = publicTime;//上架时间
        this.desc=desc;//简介
    }
}

/**
 * 推荐页-最新专辑列表 - 创建专辑对象
 * @param data
 * @returns {Album}
 */
export function createAlbumByList(data) {
    return new Album(
        data.album_id,
        data.album_mid,
        data.album_name,
        `http://y.gtimg.cn/music/photo_new/T002R300x300M000${data.album_mid}.jpg?max_age=2592000`,
        filterSinger(data.singers),
        data.public_time
    )

}

/**
 * 显示歌曲的所有演唱歌手
 * @param singers
 * @returns {string}
 */
function filterSinger(singers) {
    let signerArray = singers.map(singer => {
        return singer.singer_name;
    });
    return signerArray.join("/");
}

/**
 * 专辑详情页 - 获取专辑对象
 * @param data
 * @returns {Album}
 */
export function createAlbumByDetail(data){
    return new Album(
        data.id,
        data.mid,
        data.name,
        `http://y.gtimg.cn/music/photo_new/T002R300x300M000${data.mid}.jpg?max_age=2592000`,
        data.singername,
        data.aDate,
        data.desc
    )
}

