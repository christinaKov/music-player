import React from "react";

const LibrarySong = ({
	songs,
	song,
	setCurrentSong,
	audioRef,
	isPlaying,
	setSongs,
}) => {
	const songSelectHandler = async () => {
		await setCurrentSong(song);
		const newSongs = songs.map((item) => {
			if (item === song) {
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
		if (isPlaying) audioRef.current.play();
	};

	return (
		<div
			onClick={songSelectHandler}
			className={`library-song ${song.active ? "selected" : ""}`}
		>
			<img alt={song.name} src={song.cover}></img>
			<div className="song-description">
				<h3>{song.name}</h3>
				<h4>{song.artist}</h4>
			</div>
		</div>
	);
};

export default LibrarySong;
