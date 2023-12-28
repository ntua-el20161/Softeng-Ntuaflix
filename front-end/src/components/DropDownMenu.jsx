import '../styles/DropDownMenu.css'
import { useState} from 'react'

export const DropDownMenu = ({options, value, setOpt}) => {

    const [openMenu, setOpenMenu] = useState(false)
    const [option, setOption] = useState(value)

    const handleOptionClick = (opt) => {
        setOption(opt)
        setOpt(opt)
        setOpenMenu(false)
    }

    return (
        <div className="dropdown">
            <button className="dropdown-button" type="button" onClick={()=>setOpenMenu((prev) => !prev)}>{option}</button>
            {
            openMenu &&
            <ul className="dropdown-menu"> {
                options && options.length > 0 &&
                options.map((opt, index)=> {
                    return (
                        <li key={index} className="dropdown-content">
                            <button onClick={() => handleOptionClick(opt)}>{opt}</button>
                        </li>
                    )
                })}
            </ul>
            }
        </div>
    )
}