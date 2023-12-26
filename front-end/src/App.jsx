import { useState } from 'react'
import {SearchName} from './components/SearchName'
import {SearchResultsList} from './components/SearchResultsList'

function App() {

  const [results, setResults] = useState([])

  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg bg-body-tertiary navbar sticky-top bg-body-tertiary" data-bs-theme="dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Ntuaflix</a>
          <SearchName setResults={setResults}/>
          <button className="navbar-toggler justify-content-right" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
      </nav>
      <div className="container-fluid">
        <SearchResultsList results={results}/>
      </div>
    </div>
  )
}

export default App