import { useParams } from 'react-router-dom'
const Filme = () => {
    const {id} = useParams()
    return (
        <h1>Filmezin dos cria: {id}</h1>
    )
}

export default Filme