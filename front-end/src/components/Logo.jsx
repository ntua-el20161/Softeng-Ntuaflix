import '../styles/Logo.css'
import {Link} from 'react-router-dom'

export const Logo = () => {
    return (
        <Link className="logo" to="/">Ntuaflix</Link>
    )
}