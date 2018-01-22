import { combineReducers } from 'redux'
import * as ActionTypes from "./actionTypes"
import localStorage from "../util/storage"

 //需要存储的初始状态数据
const initialState = {
	showStatus: false,  //显示状态
	song: localStorage.getCurrentSong(),  //当前歌曲
	songs: localStorage.getSongs()  //歌曲列表
};

//拆分Reducer

/**
 * 显示或隐藏播放状态
 * @param showStatus
 * @param action
 * @returns {*}
 */
function showStatus(showStatus = initialState.showStatus, action) {
	switch (action.type) {
		case ActionTypes.SHOW_PLAYER:
			return action.showStatus;
		default:
			return showStatus;
	}
}

/**
 * 修改当前歌曲
 * @param song
 * @param action
 * @returns {*}
 */
function song(song = initialState.song, action) {
	switch (action.type) {
		case ActionTypes.CHANGE_SONG:
			localStorage.setCurrentSong(action.song);
			return action.song;
		default:
			return song;
	}
}

/**
 * 添加或移除歌曲
 * @param songs
 * @param action
 * @returns {*}
 */
function songs(songs = initialState.songs, action) {
	switch (action.type) {
		case ActionTypes.SET_SONGS:
			localStorage.setSongs(action.songs);
			return action.songs;
		case ActionTypes.REMOVE_SONG_FROM_LIST:
			let newSongs = songs.filter(song => song.id !== action.id);
			localStorage.setSongs(newSongs);
			return newSongs;
		default:
			return songs;
	}
}

/**
 * 合并Reducer
 * @type {Reducer<any>}
 */
const reducer = combineReducers({
	showStatus,
	song,
	songs
});

export default reducer