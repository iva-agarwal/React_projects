import { createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'



  export const geniusApi= createApi({
    reducerPath:'geniusApi',
    baseQuery: fetchBaseQuery({
      baseUrl:'https://shazam-api6.p.rapidapi.com',
      prepareHeaders:(headers)=>{
        headers.set('X-RapidAPI-Key','c7907c44dfmsh37305038ac75501p131bcejsnd3e2638e96bc')

        return headers;
      },

    }),
 endpoints:(builder)=>({
  getSongDetails: builder.query({ query:({songid})=>`/shazam/about_track?track_id=${songid}
  `}),
  getRelatedSongs: builder.query({ query:({songid})=>`/shazam/similar_tracks?track_id=${songid}
`}),
getSongsByCountry: builder.query({ query:(countryCode)=>`/shazam/top_tracks_country?country_code=${countryCode}
`})
 }),
  })

  export const{
    useGetSongDetailsQuery,
    useGetRelatedSongsQuery,
    useGetSongsByCountryQuery
  }=geniusApi;