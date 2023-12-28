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
        <div className="info">
            {name ? (
                Object.keys(name).length > 0 ? (
                <>
                    <h2>{name.name}</h2>
                    <img src={Img} alt="Default"></img>
                    <p>ID: {name.nameID}</p>
                    <p>Name: {name.name}</p>
                    <p>Birth Year: {name.birthYr}</p>
                    <p>Death Year: {name.deathYr}</p>
                    <p>Profession: {name.profession}</p>
                    <p>
                        Categories: {name.nameTitles && name.nameTitles.length > 0 ? (
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
                </>
                ):(
                    <h2>Loading... &#9829;</h2>
                )
            ) : (
                <h2>No Contributor found. &#128546;</h2>
            )}
        </div>
        </>
    )
}

export default NameInfo