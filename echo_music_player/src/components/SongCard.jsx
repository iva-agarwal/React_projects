import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice";

const SongCard = ({ song,isPlaying,activeSong, i,data }) => {
 const dispatch=useDispatch();
  const handlePauseClick=()=>{
    dispatch(playPause(false))
  }
  const handlePlayClick=()=>{
    dispatch(setActiveSong({song, data,i}))
    dispatch(playPause(true))
  }

  return (
    <div className="flex flex-col w-[250px]  bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer hover:scale-105 transition-transform duration-500">
      <div className="relative w-full h-54 group  border-gray-200  ">
        <div className={`absolute  inset-0 justify-center 
        items-center backdrop-filter backdrop-blur-md 
        rounded-lg
        bg-opacity-30 
         group-hover:flex 
         ${activeSong?.title === song.title ? 'flex ' : 'hidden'}`}>
          <PlayPause 
          isPlaying={isPlaying}
          activeSong={activeSong}
          song={song}
          handlePause={handlePauseClick}
          handlePlay={handlePlayClick}
          />
        </div>
        <img alt="song_img" src={song.images?.coverart} className="rounded-t-lg"/>
      </div>
      <div className="mt-4 flex flex-col">
      <p className="  text-lg text-white truncate m-2">
        <Link to={`/songs/${song?.key}`}>{song.title}</Link>
      </p>
      <p className=" text-sm text-gray-300 m-2">
        <Link to={song.artists ? `/artists/${song?.artists[0]?.adamid}`: '/top-artists'}>{song.subtitle}</Link>
      </p>
      
      </div>
    </div>
  );
};

export default SongCard;
