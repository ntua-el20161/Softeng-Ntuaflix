import '../styles/Card.css'
import Img from '../logo.svg'
import { Link } from 'react-router-dom'

export const TitleCard = ({title}) => {

    const { titleID, originalTitle, rating, genres} = title

    return (
        <>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
        <div className = "card-container">
            <div className = "card-img-container">
                {(
                    <img className="card-img" src={Img} alt="Default"/>
                    )
                }
            </div>
            <div className= "card-details">
                <div>
                    <span className="title">{originalTitle}</span>
                </div>
                <div>
                    <span className="list">Genre: {genres.map((genre, index) => <span key={index}>{genre.genreTitle}</span>)}</span>
                </div>
                <div>
                    <Link to={`/title/${titleID}`} className="view-info-button">ViewInfo</Link>
                </div>
                <div className="ratings">
                    <span className="fa fa-star checked">
                        <span>{rating.avRating}</span>
                    </span>
                    <span>{rating.nVotes}</span>
                </div>
            </div>
        </div>
        </>
    )
}