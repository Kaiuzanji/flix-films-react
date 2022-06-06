import axios from 'axios'

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
})

const apiKey = '' // set you api key here

export const getMoviesNowPlaying = async () => {
    return api
    .get(`movie/now_playing?api_key=${apiKey}&language=pt-BR`)
    .then( result => result.data.results )
    .catch( err => {
        console.log(err)
        return []
    })
}