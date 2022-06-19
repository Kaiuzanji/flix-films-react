import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Home from './pages/Home'
import Filme from './pages/Filme'
import Favorites from './pages/Favorites'
import Navbar from './components/Navbar'

export default function RoutesApp(){
    return (
        <BrowserRouter>
            <Navbar />
            <ToastContainer autoClose={2000}/>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/movie/:id" element={<Filme />} />
                <Route path="/favorites" element={<Favorites />} />
            </Routes>
        </BrowserRouter>
    )
}