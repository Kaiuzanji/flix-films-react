import axios from 'axios'

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
})

const apiKey = 'd808d997e7ad3405e60c8bd4cbb74edb' // set you api key here

export const getMoviesNowPlaying = async () => {
    return await api
    .get(`movie/now_playing?api_key=${apiKey}&language=pt-BR`)
    .then( result => result.data.results )
    .catch( err => {
        console.log(err)
        return []
    })
}

export const getMovie = async (id) => {
    return await api
    .get(`movie/${id}?api_key=${apiKey}&language=pt-BR`)
    .then( result => result.data )
    .catch( err => {
        console.log(err)
        return { error: err.toString() }
    })
}