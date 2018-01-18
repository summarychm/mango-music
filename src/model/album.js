/**
 *  专辑类模型
 */
export class Album {
    constructor(id, mId, name, img, singer, publicTime) {
        this.id = id;
        this.mId = mId;//专辑id
        this.name = name;//专辑名称
        this.img = img;//专辑封面
        this.singer = singer;//歌手
        this.publicTime = publicTime;//上架时间
    }
}

//通过专辑列表数据创建专辑对象
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

//显示所有歌手
function filterSinger(singers) {
    let signerArray = singers.map(singer => {
        return singer.singer_name;
    });
    return signerArray.join("/");
}
