
export const MyDropDownMenu = ({setOption}) => {

    const handleSelectOption = (option => {
        setOption(option)
    })

    return (
        <ul
            className="dropdown"
            aria-labelledby="dropdownMenuButton"
            style={{listStyleType: "none", display: "block"}}
        >
            <li>
                <button
                    className="dropdown-content"
                    type="button"
                    style={{minWidth: "80px"}}
                    onClick={() => handleSelectOption("Titles")}
                >
                Titles
                </button>
            </li>
            <li>
                <button
                    className="dropdown-content"
                    type="button"
                    style={{minWidth: "80px"}}
                    onClick={() => handleSelectOption("Names")}
                >
                Names
                </button>
            </li>
        </ul>
    )
}