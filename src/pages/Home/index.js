import { CircleNotch, Eye } from 'phosphor-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getMoviesNowPlaying } from '../../services/movie'

const Home = () => {
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadMovies = async () => {
            const movies = await getMoviesNowPlaying()
            setMovies(movies)
            setLoading((movies.length === 0))
        }
        loadMovies()
    }, [])

    return (
        <>
            <header className='w-full flex justify-center'>
                <h1 className='text-zinc-400 font-sans font-bold text-4xl mt-10 bg-slate-800 p-4'>Filmes em Cartaz</h1>
            </header>
            <main className='flex justify-center mt-6 text-white'>
                {
                    loading 
                    ?
                    <div>
                        <h3 className='mb-4'>Carregando...</h3>
                        <span className='flex justify-center'>
                            <CircleNotch size={60} className='animate-spin' />
                        </span>
                    </div>
                    : 
                    <section className='grid grid-cols-4 gap-2 w-10/12'>
                        {
                            movies.map( movie => {
                                return (
                                    <article className='relative bg-transparent overflow-hidden group' key={movie.id}>
                                        <Link to={`/movie/${movie.id}`}>
                                            <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} className="rounded-lg h-[70%] hover:opacity-80" alt={movie.title} />
                                            <span className='absolute top-40 left-16 text-2xl opacity-0 transition-opacity group-hover:opacity-100 flex flex-col items-center'>Ver mais <Eye size={40}/></span>
                                        </Link>
                                        <div className='flex flex-col'>
                                            <strong className='text-lg whitespace-nowrap mt-2' title={movie.title}>{movie.title}</strong>
                                            <strong className='text-lg whitespace-nowrap'>Avaliação: {movie.vote_average}</strong>
                                        </div>
                                    </article>
                                )
                            })
                        }
                    </section>
                }
            </main>
        </>
    )
}

export default Home