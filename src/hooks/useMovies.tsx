import React, { useEffect, useState } from 'react'
import { movieDB } from '../api/movieDB';
import { MovieDBNowPlaying, Movie } from '../interfaces/movieInterface';

export const useMovies = () => {
    
    const [isLoading, setisLoading] = useState(true)
    const [peliculasEnCine, setpeliculasEnCine] = useState<Movie[]>([])
    const [peliculasPopulares, setPeliculasPopulares] = useState<Movie[]>([])
    const [peliculasTop, setPeliculasTop] = useState<Movie[]>([])
    const getMoviesNow = async()=>{
        const resp = await movieDB.get<MovieDBNowPlaying>('/now_playing');
        setpeliculasEnCine(resp.data.results);

        setisLoading(false);
    } 
    const getPopular = async()=>{
        const resp = await movieDB.get('/popular');
        setPeliculasPopulares(resp.data.results);
    }

    const getTopRated = async()=>{
        const resp = await movieDB.get('/top_rated');
        setPeliculasTop(resp.data.results);
    }

    useEffect(() => {
        //now_playing
        getMoviesNow();
        getPopular();
        getTopRated();
    }, [])

    return{
        peliculasEnCine,
        peliculasPopulares,
        peliculasTop,
        isLoading
    }
}
