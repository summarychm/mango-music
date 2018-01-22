import React from "react"
//
import Player from "@/containers/Player"
//播放列表
import PlayerList from "@/containers/PlayerList"

/**
 * 播放器组件
 */
class MusicPlayer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			currentSongIndex: 0,//当前歌曲索引
			show: false,  //控制播放列表显示和隐藏
		}
	}
	changeCurrentIndex = (index) => {
		this.setState({
			currentSongIndex: index
		});
	}
	showList = (status) => {
		this.setState({
			show: status
		});
	}
	render() {
		return (
			<div className="music-player">
				<Player currentIndex={this.state.currentSongIndex}
					showList={this.showList}
					changeCurrentIndex={this.changeCurrentIndex}/>
				<PlayerList currentIndex={this.state.currentSongIndex}
					showList={this.showList}
					changeCurrentIndex={this.changeCurrentIndex}
					show={this.state.show}/>
			</div>
		);
	}
}

export default MusicPlayer;