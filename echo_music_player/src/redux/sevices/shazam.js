import { createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'



  export const shazamApi= createApi({
    reducerPath:'shazamApi',
    baseQuery: fetchBaseQuery({
      baseUrl:'https://shazam.p.rapidapi.com',
      prepareHeaders:(headers)=>{
        headers.set('X-RapidAPI-Key','c7907c44dfmsh37305038ac75501p131bcejsnd3e2638e96bc')

        return headers;
      },

    }),
 endpoints:(builder)=>({
  getCharts:builder.query({ query:()=>"charts/track"}),
  getArtistDetails: builder.query({ query:(artistId)=>`https://shazam.p.rapidapi.com/artists/get-details?id=${artistId}
`}),
getTopSongs: builder.query({ query:(artistId)=>`/artists/get-top-songs?id=${artistId}
`}),
getSongsBySearch: builder.query({ query:(searchTerm)=>`/search?term=${searchTerm}
`}),
 }),
  })

  export const{
    useGetChartsQuery,
    useGetArtistDetailsQuery,
    useGetTopSongsQuery,
    useGetSongsBySearchQuery

  }=shazamApi;