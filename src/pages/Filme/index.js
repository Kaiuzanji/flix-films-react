import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getMovie } from '../../services/movie'
import { CircleNotch, Heart, FilmStrip } from 'phosphor-react'

const Filme = () => {
    const {id} = useParams()
    const [loading, setLoading] = useState(true)
    const [movie, setMovie] = useState({})
    const navegate = useNavigate()
    useEffect(() => {
        const getApiMovie = async () => {
            await getMovie(id)
            .then( result => {
                if(result.error)
                    navegate("/", { replace: true })
                setMovie(result)
                setLoading(false)
            })
            .catch( err => navegate("/", { replace: true }))
        }   
        getApiMovie()
    }, [id, navegate])

    return (
        <main>
            {
                loading 
                ? 
                <div className='flex justify-center flex-col items-center mt-52 text-slate-300'>
                    <span className='flex justify-center items-center'>
                        <CircleNotch size={100} className='animate-spin' />
                    </span>
                </div>
                :
                <div>
                    <article className='relative bg-transparent flex overflow-hidden' key={movie.id}>    
                        <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} className="rounded-lg h-5/12 p-4 w-3/12" alt={movie.title} />
                        <div className='flex flex-col text-slate-300'>
                            <strong className='text-lg whitespace-nowrap mt-2' title={movie.title}>{movie.title}</strong>
                            <strong className='text-lg textslate-'>Sinopse:</strong>
                            <p className='text-lg w-[50%] mt-2'>{movie.overview}</p>
                            <strong className='text-lg whitespace-nowrap'>Avaliação: {movie.vote_average}</strong>
                            <div className='flex gap-4 mt-2'>
                                <button className='p-2 bg-slate-700 text-lg text-slate-300 rounded-md flex gap-2 items-center'>Salvar <Heart size={20} className="text-red-500" weight='fill'/></button>
                                <a target="blank" rel="external" href={`https://www.youtube.com/results?search_query=Trailer ${movie.title}`}>
                                    <button className='p-2 bg-slate-700 text-lg text-slate-300 rounded-md flex gap-2 items-center'>Trailer <FilmStrip size={20} className="text-slate-300" weight='fill'/></button>
                                </a>
                            </div>
                        </div>
                    </article>
                </div>
            }
        </main>
    )
}

export default Filme