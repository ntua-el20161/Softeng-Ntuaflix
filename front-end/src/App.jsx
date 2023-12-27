import { useState } from 'react'
import { MyDropDownMenu } from './components/MyDropDownMenu'
import { SearchBar } from './components/SearchBar'
import { SearchResultsList } from './components/SearchResultsList'

function App() {

  const [results, setResults] = useState([]) //set search results
  const [openMenu, setOpenMenu] = useState(false) //open or close the title-name menu
  const [option, setOption] = useState('Titles') // set search options from the title-name menu

  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg bg-body-tertiary navbar sticky-top bg-body-tertiary" data-bs-theme="dark">
        <a className="navbar-brand" href="#">Ntuaflix</a>
        <div className ="container-center d-flex justify-content-center-between align-items-center">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            style={{ minWidth: "100px" }}
            onClick={() => setOpenMenu((prev) => !prev)}
          >
            {option}
          </button>
          {openMenu && <MyDropDownMenu setOption={setOption} />}
          <SearchBar setResults={setResults} option={option} />
        </div>
        <button className="navbar-toggler justify-content-center active">
          <span className="navbar-toggler-icon"></span>
        </button>
      </nav>
      <div className="container-fluid">
        <SearchResultsList results={results} option={option}/>
      </div>
    </div>
  )
}

export default App