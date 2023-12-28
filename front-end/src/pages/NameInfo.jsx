import {useState, useEffect} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
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
                console.log('Response:', response)
                handleData(response.data)
            } catch (error) {
                console.error('Error fetching title information', error)
                navigate(-1)
            }
        }
    
        getName()
    }, [nameID, navigate])

    return (
        <>
        <NavBar>
            <Logo/>
        </NavBar>
        <div className="info-container">
            {name ? (
                Object.keys(name).length > 0 ? (
                <>
                    <div className="header">{name.name}</div>
                    <div className="info-image-container">
                        <img className="info-image" src={Img} alt="Default"></img>
                    </div>
                    <div className="info-details">
                        <p>ID: <span>{name.nameID}</span></p>
                        <p>Name: <span>{name.name}</span></p>
                        <p>Birth Year: <span>{name.birthYr}</span></p>
                        <p>Death Year: <span>{name.deathYr}</span></p>
                        <p>Profession: <span>{name.profession}</span></p>
                        <p>Categories: {name.nameTitles && name.nameTitles.length > 0 ? (
                                name.nameTitles.map((nameTitle, index) => (
                                    <span key={index}>
                                        {nameTitle.category}
                                        {index !== name.nameTitles.length - 1 ? ', ' : ''}
                                    </span>
                                ))
                            ) : (
                                <span>No categories available</span>
                            )}
                        </p>
                    </div>
                </>
                ):(
                    <div className="title">Loading... &#9829;</div>
                )
            ) : (
                <div className="title">No Contributor found. &#128546;</div>
            )}
        </div>
        </>
    )
}

export default NameInfo