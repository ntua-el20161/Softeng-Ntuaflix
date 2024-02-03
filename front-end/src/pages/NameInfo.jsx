import '../styles/Info.css'
import {useState, useEffect} from 'react'
import {Link, useParams, useNavigate} from 'react-router-dom'
import {nm_URL} from '../apiConfig'
import axios from 'axios'
import Img from '../logo.svg'

import {NavBar} from '../components/NavBar'
import {Logo} from '../components/Logo'

const NameInfo = () => {

    const { nameID } = useParams()
    const [name, setName] = useState({})
    const navigate = useNavigate(-1)

    const handleData = (data) => {
        setName(data)
        console.log(data)
    }

    useEffect(() => {
        console.log('Effect is running with values:', { nm_URL, nameID, navigate})
        const getName = async () => {
            try {
                const response = await axios.get(nm_URL + '/' + nameID)
                handleData(response.data)
            } catch (error) {
                console.error('Error fetching title information', error)
                navigate(-1)
            }
        }
    
        getName()
    }, [nameID, navigate])

    const substituteWidth = (url) => {
        return url.replace('{width_variable}', 'w220_and_h330_face');
    };

    return (
        <>
        <NavBar>
            <Logo/>
        </NavBar>
        <div className="info-container">
            {name ? (
                Object.keys(name).length > 0 ? (
                <>
                    <div className="info-title">{name.name}</div>
                    <div className="info-image-container">
                        {name.namePoster? (<img className="info-img" src={substituteWidth(name.namePoster)} alt=""></img>):(<img className="info-img" src={Img} alt="Default"></img>)}
                    </div>
                    <div className="info-details">
                        {/* <p>ID: <span>{name.nameID}</span></p> */}
                        <p>Name: <span>{name.name}</span></p>
                        <p>Birth Year: <span>{name.birthYr}</span></p>
                        <p>Death Year: <span>{name.deathYr}</span></p>
                        <p>Profession: <span>{name.profession}</span></p>
                        <p>Known For: {
                            name.nameTitles && name.nameTitles.length > 0 ? (
                                name.nameTitles.map((nameTitle, index) => (
                                    <span className="info-button-container" key={index}>
                                        <Link to={`/title/${nameTitle.titleID}`}>
                                            <button className="info-button">{nameTitle.title}</button>
                                        </Link>
                                        {/* {index !== name.nameTitles.length - 1 ? ', ' : ''} */}
                                    </span>
                                ))
                            ) : (
                                <span>No titles available &#128546;</span>
                            )}
                        </p>
                    </div>
                </>
                ):(
                    <div className="info-title">Loading... &#9829;</div>
                )
            ) : (
                <div className="info-title">No Contributor found. &#128546;</div>
            )}
        </div>
        </>
    )
}

export default NameInfo