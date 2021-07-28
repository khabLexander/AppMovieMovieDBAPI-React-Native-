import { useEffect, useState } from "react"
import { movieDB } from "../api/movieDB";
import { MovieFull } from "../interfaces/movieInterface";
import { Cast, CreditsResponse } from '../interfaces/creditsInterface';

interface MovieDetails{
    isLoading: boolean,
    movieFull?: MovieFull
    cast:Cast[],
}

export const useMovieDetails = (movieId: number) => {


    const [state, setstate] = useState<MovieDetails>({
        isLoading:true,
        movieFull: undefined,
        cast: [] 
    });

    const getMovieDetails = async()=>{
       const movieDeatilsPromise = movieDB.get<MovieFull>(`/${movieId}`);
       const castPromise =  movieDB.get<CreditsResponse>(`/${movieId}/credits`);

       const [movieDetailsResponse, castPromiseResponse] = await Promise.all([movieDeatilsPromise, castPromise])

       setstate({
           isLoading:false,
           movieFull:movieDetailsResponse.data,
           cast: castPromiseResponse.data.cast
       })

    }

    useEffect(() => {
        getMovieDetails();
    }, [])
    return{
        ...state
    } ;
}
