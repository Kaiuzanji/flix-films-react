import { useCallback, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getMovie } from '../../services/movie'
import { CircleNotch, Heart, HeartBreak, FilmStrip } from 'phosphor-react'
import { toast } from 'react-toastify'

const Filme = () => {
    const {id} = useParams()
    const [loading, setLoading] = useState(true)
    const [movie, setMovie] = useState({})
    const [isSavedMovie, setIsSavedMovie] = useState(false)
    const navegate = useNavigate()

    const favoritedMovies = useCallback(() => {
        const favoritedMovies = () => {
            const savedMovies = JSON.parse(localStorage.getItem("@flixFilms") || [])
            const hasMovie = savedMovies.some( savedMovie => savedMovie.id === movie.id )
            return {
                savedMovies: savedMovies,
                isFavorited: hasMovie
            }
        }
        return favoritedMovies()
    }, [movie])

    useEffect(() => {
        const getApiMovie = async () => {
            await getMovie(id)
            .then( result => {
                if(result.error)
                    navegate("/", { replace: true })
                setIsSavedMovie(favoritedMovies().isFavorited)
                setMovie(result)
                setLoading(false)
            })
            .catch( err => navegate("/", { replace: true }))
        }   
        getApiMovie()
    }, [id, navegate, favoritedMovies])

    const saveMovie = () => {
        const movies = favoritedMovies()
        if(isSavedMovie){
            localStorage.setItem("@flixFilms", JSON.stringify(movies.savedMovies.filter( savedMovie => savedMovie.id !== movie.id )))
            setIsSavedMovie(false)
            toast("Removido dos favoritos !", {
                icon: <HeartBreak size={15} className="text-red-500" weight='fill'/>,
                theme: 'dark',
                type: 'success',
                hideProgressBar: true
            });
            return
        }
        localStorage.setItem("@flixFilms", JSON.stringify(movies.savedMovies.concat(movie)))
        toast.success("Adicionado aos favoritos !", {
            icon: <Heart size={15} className="text-red-500" weight='fill'/>,
            theme: 'dark',
            type: 'success',
            hideProgressBar: true
        });
        setIsSavedMovie(true)
    }

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
                                <button onClick={saveMovie} className='p-2 bg-slate-700 text-lg text-slate-300 rounded-md items-center'>
                                    {
                                        isSavedMovie
                                        ?
                                        <span className='flex gap-2 items-center'>
                                            Remover
                                            <Heart size={20} className="text-red-500" weight='fill'/>
                                        </span>
                                        :
                                        <span className='flex gap-2 items-center'>
                                            Salvar
                                            <Heart size={20} className="text-red-500" weight='thin'/>
                                        </span> 
                                    }
                                </button>
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