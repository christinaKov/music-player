//Import Styles
import "./styles/app.scss";

//Import util
import data from "./data";

//Adding Components
import Player from "./components/Player";
import Song from "./components/Song";
import Library from "./components/Library";
import Nav from "./components/Nav";
import { useState, useRef } from "react";

function App() {
	// Ref
	const audioRef = useRef(null);
	//State
	const [songs, setSongs] = useState(data());
	const [currentSong, setCurrentSong] = useState(songs[0]);
	const [isPlaying, setIsPlaying] = useState(false);
	const [songInfo, setSongInfo] = useState({
		currentTime: 0,
		duration: 0,
		animationPercentage: 0,
	});
	const [libraryStatus, setLibraryStatus] = useState(false);

	// Handlers
	const timeUpdateHandler = (e) => {
		const current = e.target.currentTime;
		const duration = e.target.duration;
		// Calculate Persentage
		const roundedCurrent = Math.round(current);
		const roundedDuration = Math.round(duration);
		const animationPercentage = Math.round(
			(roundedCurrent / roundedDuration) * 100
		);

		setSongInfo({
			...songInfo,
			currentTime: current,
			duration,
			animationPercentage,
		});

		if (isPlaying) audioRef.current.play();
	};
	const songEndHandler = async () => {
		let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
		await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
	};

	return (
		<div className={`App ${libraryStatus ? "library-active" : ""}`}>
			<Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
			<Song currentSong={currentSong} />
			<Player
				songs={songs}
				songInfo={songInfo}
				setSongInfo={setSongInfo}
				audioRef={audioRef}
				isPlaying={isPlaying}
				setIsPlaying={setIsPlaying}
				currentSong={currentSong}
				setCurrentSong={setCurrentSong}
				setSongs={setSongs}
			/>
			<Library
				libraryStatus={libraryStatus}
				setSongs={setSongs}
				isPlaying={isPlaying}
				audioRef={audioRef}
				songs={songs}
				setCurrentSong={setCurrentSong}
			/>
			<audio
				onLoadedMetadata={timeUpdateHandler}
				onTimeUpdate={timeUpdateHandler}
				ref={audioRef}
				src={currentSong.audio}
				onEnded={songEndHandler}
			></audio>
		</div>
	);
}

export default App;
