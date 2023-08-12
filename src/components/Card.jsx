import { Link } from 'react-router-dom'
import { AiFillYoutube, AiFillInstagram, AiFillTwitterCircle } from 'react-icons/ai'
import './Card.css'

const Card = (creator) =>  {

  const goToYouTube = () => {
    window.open("https://www.youtube.com/@" + creator.youtube, "_blank")
  }

  const goToTwitter = () => {
    window.open("https://www.twitter.com/" + creator.twitter, "_blank")
  }

  const goToInstagram = () => {
    window.open("https://www.instagram.com/" + creator.instagram, "_blank")
  }

  return (
      <article>
        <div className="card-container" style={{ backgroundImage:`url(${creator.image})`}}>
          <div className="card-content" >
            <Link to={`/${creator.id}`}><h3 className="card-title"> {creator.name}</h3></Link>
            
            <p className="card-description">{creator.description}</p>
            <div className="social-icons">
              <AiFillYoutube color="#FF0000" size = '30px' onClick={goToYouTube} />
              <AiFillTwitterCircle color="#1DA1F2" size = '30px' onClick={goToTwitter} />
              <AiFillInstagram color='#F56040'  size = '30px' onClick={goToInstagram} />
            </div>
            <div className="edit">
            <Link to={`/edit/${creator.id}`}>Edit</Link>
            </div>
          </div>
        </div>      
      </article>

  )
}

export default Card