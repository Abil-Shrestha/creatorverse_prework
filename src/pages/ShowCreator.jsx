import { useState, useEffect } from 'react'
import Card from '../components/card'

const ShowCreators = (props) => {

    const [creators, setCreators] = useState([])

    useEffect(() => {
        setCreators(props.data)
    }, [props])
    
    return (
        <section className="ShowCreators">
            {
                creators && creators.length > 0 ?
                creators.map((creator,index) => 
                <Card key={creator.id} id={creator.id} name={creator.name} youtube={creator.youtube} twitter={creator.twitter} instagram={creator.instagram} description={creator.description} image={creator.image}/>
                ) : <h3>{'No Creators Yet 😞'}</h3>
            }
        </section>  
    )
}

export default ShowCreators