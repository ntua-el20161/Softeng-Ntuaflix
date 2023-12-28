import '../styles/Card.css'
import Img from '../logo.svg'
import {Link} from 'react-router-dom'

export const NameCard = ({nm}) => {

    const { nameID, name, profession} = nm

    return (
    <>
        {/* <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/> */}
        <div className="card-container">
            <div className="card-img-container">
                {
                    <img className="card-img" src={Img} alt="Default" />
                }
            </div>
            <div className="card-details">
                <div>
                    <span className="title">{name}</span>
                </div>
                <div>
                    <span className="info">Profession: {profession}</span>
                </div>
                <div>
                    <Link to={`/name/${nameID}`} className="view-info-button">ViewInfo</Link>
                </div>
                {/* <div>
                    <span className="genre">
                        Categories:{' '}
                        {
                            nameTitles && nameTitles.length > 0 ? (
                                nameTitles.map((nameTitle, index) => (
                                    <span key={index}>{nameTitle.category}</span>
                                ))) :
                            <span>No categories available</span>
                        }
                    </span>
                </div> */}
        </div>
        </div>
    </>
    );
}