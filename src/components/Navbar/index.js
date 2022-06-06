import { Link } from 'react-router-dom'
import LogoFlix from '../../assets/logoflix.png'
import { BellIcon } from '@heroicons/react/solid'
const navegationList = [
    { name: 'Meus Filmes', href: '#', current: false },
]

const Navbar = () => {
    return (
        <header className='bg-gray-800 p-2 text-white'>
            <div className='flex items-center justify-between'>
                <nav className='flex items-center'>
                    <img src={LogoFlix} width="150px" alt="logo" />
                    <ul>
                        {
                            navegationList.map( navegation => {
                                return (
                                    <Link to={navegation.href}>
                                        <li>
                                            <button 
                                                className={
                                                    `p-3 rounded-lg hove:bg-neutral-700
                                                    ${navegation.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}
                                                    `
                                                }
                                            >
                                                {navegation.name}
                                            </button> 
                                        </li>
                                    </Link>
                                )
                            })
                        }
                    </ul>
                </nav>
                <BellIcon className='w-6 h-6'/>
            </div>
        </header>
    )
}

export default Navbar