import '../styles/Card.css'
import Img from '../logo.svg'
import {Link} from 'react-router-dom'

export const NameCard = ({nm}) => {

    const { nameID, name, profession, namePoster} = nm

    const substituteWidth = (url) => {
        return url.replace('{width_variable}', 'w220_and_h330_face');
    };

    return (
    <>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
        <div className="card-container">
            <div className="card-img-container">
                {namePoster? (<img className="card-img" src={substituteWidth(namePoster)} alt="Default"/>) : (<img className="card-img" src={Img} alt="Default"/>)}
            </div>
            <div className="card-details">
                <div>
                    <span className="card-title">{name}</span>
                </div>
                    <p className="card-list">Profession: <span>{profession}</span></p>
                <div className="viewInfoBtn-container">
                    <Link to={`/name/${nameID}`} className="view-info-button">
                        <button className="viewInfo-button">View Info</button>
                    </Link>
                </div>
        </div>
        </div>
    </>
    )
}