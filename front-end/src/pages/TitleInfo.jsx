import {useState, useEffect} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import {tt_URL} from '../apiConfig'
import axios from 'axios'
import Img from '../logo.svg'

import {NavBar} from '../components/NavBar'
import {Logo} from '../components/Logo'

const TitleInfo = () => {

    const { titleID } = useParams()
    const [title, setTitle] = useState({})
    const navigate = useNavigate(-1)

    const handleData = (data) => {
        setTitle(data)
        console.log(data)
    }

    useEffect(() => {
        console.log('Effect is running with values:', { tt_URL, titleID, navigate})
        const getTitle = async () => {
            try {
                const response = await axios.get(tt_URL + '/' + titleID)
                console.log('Response:', response)
                handleData(response.data)
            } catch (error) {
                console.error('Error fetching title information', error)
                navigate(-1)
            }
        }
    
        getTitle()
    }, [titleID, navigate])

    return (
        <>
        <NavBar>
            <Logo/>
        </NavBar>
            <div className="info">
                {title ? (
                    Object.keys(title).length > 0 ? (
                    <>
                        <h2>{title.originalTitle}</h2>
                        <img src={Img} alt="Default"></img>
                        <p>ID: {title.titleID}</p>
                        <p>Type: {title.type}</p>
                        <p>OriginalTitle: {title.originalTitle}</p>
                        <p>StartYear: {title.startYear}</p>
                        <p>
                            Genres: {title.genres && title.genres.length > 0 ? (
                                title.genres.map((genre, index) => (
                                    <span key={index}>
                                        {genre.genreTitle}
                                        {index !== title.genres.length - 1 ? ', ' : ''}
                                    </span>
                                ))
                            ) : (
                                <span>No genres available</span>
                            )}
                        </p>
                        <p>
                            Akas: {title.titleAkas && title.titleAkas.length > 0 ? (
                                title.titleAkas.map((aka, index) => (
                                    <span key={index}>
                                        {aka.akaTitle}
                                        {index !== title.titleAkas.length - 1 ? ', ' : ''}
                                    </span>
                                ))
                            ) : (
                                <span>No Akas available</span>
                            )}
                        </p>
                        <p>
                            Contributors: {title.principals && title.principals.length > 0 ? (
                                title.principals.map((contributor, index) => (
                                    <span key={index}>
                                        {contributor.name}
                                        {index !== title.principals.length - 1 ? ', ' : ''}
                                    </span>
                                ))
                            ) : (
                                <span>No Contributors available</span>
                            )}
                        </p>
                        {title.rating && typeof title.rating === 'object' && Object.keys(title.rating).length > 0 ? (
                            <>
                                <p>AverageRating: {title.rating.avRating}</p>
                                <p>Votes: {title.rating.nVotes}</p>
                            </>
                        ):(
                            <span>No Rating available</span>
                        )}
                    </>
                    ):(
                        <h2>Loading...&#9829;</h2>
                    )
                ):(
                    <h2>No title found. &#128546;</h2>
                )}
            </div>
    </>
    )
}

export default TitleInfo