import '../styles/Card.css'
import Img from '../logo.svg'
import { Link } from 'react-router-dom'

export const TitleCard = ({title}) => {

    const { titleID, originalTitle, rating, genres, titlePoster} = title

    // Function to substitute the width variable in the image URL
    const substituteWidth = (url) => {
        return url.replace('{width_variable}', 'w220_and_h330_face');
    };

    return (
        <>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
        <div className = "card-container">
            
            <div className = "card-img-container">
                {titlePoster?
                ( <img className="card-img" src={substituteWidth(titlePoster)} alt="" />):(<img className="card-img" src={Img} alt="Default"/>) }
            </div>
            <div className= "card-details">
                <div>
                    <span className="card-title">{originalTitle}</span>
                </div>
                <p className="card-list">Genre: {
                    genres && genres.length > 0 ? (
                        genres.map((genre, index) => (
                            <span key={index}>
                                {genre.genreTitle}
                                {index !== genres.length - 1 ? ', ' : ''}
                            </span>
                        ))
                    ) : (
                        <span>No genres available</span>
                    )}
                </p>
            </div>
            <div className="card-details-bottom-container">
                    <div className="viewInfoBtn-container">
                        <Link to={`/title/${titleID}`} className="view-info-button">
                            <button className="viewInfo-button">View Info</button>
                        </Link>
                    </div>
                    <p className="card-ratings">
                        <span className="fa fa-star checked">{rating.avRating}</span>
                        <span>{rating.nVotes}</span>
                    </p>
                </div>
        </div>
        </>
    )
}