import {React, useState} from 'react'
import PropTypes from 'prop-types'
import '../styles/DropDownMenu.css'

export const DropDownMenu = ({ value, options, setOpt }) => {
    const [selectedOption, setSelectedOption] = useState(value)

    const handleOptionClick = (opt) => {
    setSelectedOption(opt)
    setOpt(opt)
    }

    return (
        <div className="dropdown">
            <select value={selectedOption} onChange={(e) => handleOptionClick(e.target.value)}>
            {options.map((opt) => (
                <option key={opt} value={opt}>
                {opt}
                </option>
            ))}
            </select>
        </div>
    )
}

DropDownMenu.propTypes = {
    value: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    setOpt: PropTypes.func.isRequired,
}
