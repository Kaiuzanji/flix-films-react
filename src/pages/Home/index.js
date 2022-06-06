import { CircleNotch } from 'phosphor-react'
import { useEffect, useState } from 'react'
import { getMoviesNowPlaying } from '../../services/movie'

const Home = () => {
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadMovies = async () => {
            const movies = await getMoviesNowPlaying()
            setMovies(movies)
            setTimeout(() => {
                setLoading((movies.length === 0))
            }, 5000)
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
                    <section className='grid grid-cols-4 gap-6 w-[80%]'>
                        {
                            movies.map( movie => {
                                return (
                                    <article className='bg-transparent overflow-hidden' key={movie.id}>
                                        <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} className="rounded-lg h-[80%]" alt={movie.title}></img>
                                        <div className='flex flex-col'>
                                            <strong className='text-lg whitespace-nowrap mt-2'>{movie.title}</strong>
                                            <strong className='text-lg whitespace-nowrap mt-2'>Avaliação: {movie.vote_average}</strong>
                                        </div>
                                        <div>
                                            <button className='w-11/12 p-2 bg-cyan-700 mt-2 rounded-md hover:bg-cyan-600'>Acessar</button>
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