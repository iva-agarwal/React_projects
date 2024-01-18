import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";
import { useGetArtistDetailsQuery,useGetTopSongsQuery } from "../redux/sevices/shazam";
import { data } from "autoprefixer";


const ArtistDetails = ({ song, i }) => {
  const { id: artistId } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data: artistData, isFetching: isFetchingArtistDetails, error } =
    useGetArtistDetailsQuery(artistId);
  const { data: topSongsData, isFetching: isFetchingTopSongs } =
    useGetTopSongsQuery(artistId);

  const artist = artistData?.data?.[0]?.attributes;
  const topSongs = topSongsData?.data || [];

  if (isFetchingArtistDetails || isFetchingTopSongs) {
    return <Loader title="Searching artist details" />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <div >
      <div className="flex flex-row mt-10 p-30">
        <img
          src={artist?.artwork?.url.replace('{w}', '500').replace('{h}', '500')}
          className="w-28 h-28 rounded-full object-cover border-1 shadow-xl shadow-black"
          alt="Artist Art"
        />

        <div className="ml-5 mt-10">
          <p className="font-bold sm:text-3xl text-xl text-white">{artist?.name}</p>
          <p className="text-base text-gray-400 mt-2">{artist?.genreNames?.[0]}</p>
        </div>
      </div>
<h1 className='font-bold text-3xl text-white p-10'>Top Songs</h1>
      <div>
        {topSongs.map((topSong, index) => (
          <div
            key={index}
            className={`w-full flex flex-row items-center hover:backdrop-blur-md ${activeSong?.title === song?.title ? 'backdrop-filter backdrop-blur-lg bg-opacity-10 bg-[#dddae4]' : 'backdrop-filter backdrop-blur-md bg-opacity-10 bg-transparent'} py-2 p-4 rounded-lg cursor-pointer mb-2`}

          >
            <h3 className="font-bold text-base text-white mr-3">{index + 1}.</h3>
            <div className="flex-1 flex flex-row justify-between items-center">
              <img
                className="w-20 h-20 rounded-lg"
                src={topSong?.attributes?.artwork?.url.replace('{w}', '125').replace('{h}', '125')}
                alt={topSong?.attributes?.name}
              />
              <div className="flex-1 flex flex-col justify-center mx-3">
                <p className="text-xl font-bold text-white">
                  {topSong?.attributes?.name}
                </p>
                <p className="text-base text-gray-300 mt-1">
                  {topSong?.attributes?.albumName}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArtistDetails;
