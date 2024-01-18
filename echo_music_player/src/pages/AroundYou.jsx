import React from 'react';
import { useState,useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Error, Loader, SongCard} from '../components'
import { useGetSongsByCountryQuery } from '../redux/sevices/genius';
const AroundYou = () => {
    const[country,setCountry]=useState('')
    const[loading,setLoading]=useState(true);
    const{activeSong,isPlaying}=useSelector((state)=>state.player)
    const {data, isFetching,error }=useGetSongsByCountryQuery(country)
console.log(data)
useEffect(()=>{
   axios.get('https://api.geoapify.com/v1/ipinfo?apiKey=232d042d5c08426fbdbc00c0bca576c8') 
   .then((res) => setCountry(res?.data?.country?.iso_code))
   .catch((err)=>console.log(err))
   .finally(()=>setLoading(false))
},[country])
    
if(isFetching && loading) return <Loader title="Loading songs around you"/>;

if (error && loading) return <Error/>

return (
<div className='flex flex-col'> 
<h2 className='font-bold text-3xl text-white text-left mt-4 mb-10'>
    Around You
</h2>
<div className='flex flex-wrap sm:justify-start justify-center gap-8'>
{data?.result?.tracks?.map((song,i)=>(
    <SongCard
    key={song.key}
    song={song}
    isPlaying={isPlaying}
    activeSong={activeSong}
    data={data}
    i={i}
  />
)

)}
</div>
</div>
)}

export default AroundYou;
