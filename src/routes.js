import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Filme from './pages/Filme'
import Navbar from './components/Navbar'

export default function RoutesApp(){
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/movie/:id" element={<Filme />} />
            </Routes>
        </BrowserRouter>
    )
}