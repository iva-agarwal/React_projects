import {Link} from 'react-router-dom'

const DetailsHeader = ({ artistId, artistData, songData}) => {
  const artist=artistData?.artists[artistId]?.attributes;
  
  return(
  <div className='relative w-full flex flex-col'> 
<div className=' w-full bg-gradient-to-l from-transparent to-gray sm:h-48 h-28'/>
<div className='absolute inset-0 flex items-center'>
<img 
alt='art' 
src={artistId?artist.
artwork?.url.replace('{w','500').replace('{h}','500'):
songData?.result.images?.coverart}
className='w-28  h-28 rounded-full
object-cover border-1 shadow-xl shadow-black'/>

<div className='ml-5'>
  <p className='font-bold sm:text-3xl text-xl text-white'>{artistId?artist?.name:songData?.result.title}</p>
  {!artistId && (
    <Link to={`/artists/${songData}?.artists[0].adamid`}> 
      <p className='text-base text-gray-400 mt-2'>{songData?.result.subtitle}</p>
    </Link>
  )}
    <p className='text-base text-gray-400 mt-2'>{artistId
    ?artist?.genreNames[0]:songData?.result.genres?.primary}</p>
</div>

</div>
<div className='w-full sm:h-24 h-14'/>
  </div>
)
};
export default DetailsHeader;
