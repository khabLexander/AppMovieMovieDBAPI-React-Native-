import axios from 'axios';

export const movieDB = axios.create({
    baseURL:'https://api.themoviedb.org/3/movie',
    params:{
        api_key: '3e3435538f9c34bc37068e4275365ba8',
        language: 'es-ES'
    }
})