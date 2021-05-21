import { useParams } from 'react-router-dom'

import SuperheroDetail from '../components/SuperheroDetail'

const SuperheroDetailPage = () => {
    const { superheroId } = useParams()
    return (
        <div>
            <h2>Superhero Detail</h2>
            <SuperheroDetail superheroId={superheroId} />       
        </div>
    )
}

export default SuperheroDetailPage 