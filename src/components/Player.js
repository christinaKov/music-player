import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faPlay,
	faAngleLeft,
	faAngleRight,
	faPause,
} from "@fortawesome/free-solid-svg-icons";

const Player = ({
	isPlaying,
	setIsPlaying,
	audioRef,
	setSongInfo,
	songInfo,
	songs,
	currentSong,
	setCurrentSong,
	setSongs,
}) => {
	const activeLibraryHandler = (nextPrev) => {
		// Add Active State
		const newSongs = songs.map((item) => {
			if (item === nextPrev) {
				return {
					...item,
					active: true,
				};
			} else {
				return {
					...item,
					active: false,
				};
			}
		});
		setSongs(newSongs);
	};
	// Event Handlers
	const playSongHandler = () => {
		if (isPlaying) {
			audioRef.current.pause();
		} else {
			audioRef.current.play();
		}

		setIsPlaying(!isPlaying);
	};
	const getTime = (time) => {
		return (
			Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
		);
	};
	const dragHandler = (e) => {
		audioRef.current.currentTime = e.target.value;
		setSongInfo({ ...songInfo, currentTime: e.target.value });
	};
	const skipTrackHandler = async (direction) => {
		let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
		if (direction === "skip-forward") {
			await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
			activeLibraryHandler(songs[(currentIndex + 1) % songs.length]);
		} else if (direction === "skip-back") {
			if (currentIndex - 1 < 0) {
				await setCurrentSong(songs[songs.length - 1]);
				activeLibraryHandler(songs[songs.length - 1]);
			} else {
				await setCurrentSong(songs[(currentIndex - 1) % songs.length]);
				activeLibraryHandler(songs[(currentIndex - 1) % songs.length]);
			}
		}

		if (isPlaying) audioRef.current.play();
	};
	// Add the styles
	const trackAnim = {
		transform: `translateX(${songInfo.animationPercentage}%)`,
	};

	return (
		<div className="player">
			<div className="time-control">
				<p>{getTime(songInfo.currentTime)}</p>
				<div
					style={{
						background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`,
					}}
					className="track"
				>
					<input
						onChange={dragHandler}
						min={0}
						max={songInfo.duration || 0}
						value={songInfo.currentTime}
						type="range"
					/>
					<div style={trackAnim} className="animate-track"></div>
				</div>
				<p>{songInfo.duration ? getTime(songInfo.duration) : "0:00"}</p>
			</div>
			<div className="play-control">
				<FontAwesomeIcon
					onClick={() => skipTrackHandler("skip-back")}
					className="skip-back"
					size="2x"
					icon={faAngleLeft}
				></FontAwesomeIcon>
				<FontAwesomeIcon
					onClick={playSongHandler}
					className="play"
					size="2x"
					icon={isPlaying ? faPause : faPlay}
				></FontAwesomeIcon>
				<FontAwesomeIcon
					onClick={() => skipTrackHandler("skip-forward")}
					className="skip-forward"
					size="2x"
					icon={faAngleRight}
				></FontAwesomeIcon>
			</div>
		</div>
	);
};

export default Player;
