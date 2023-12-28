import './App.css'

import { DropDownMenu } from './components/DropDownMenu'
import { Logo } from './components/Logo'
import { Main } from './components/Main'
import { NameCard } from './components/NameCard'
import { NavBar } from './components/NavBar'
import { SearchBar } from './components/SearchBar'
import { TitleCard } from './components/TitleCard'
import { useEffect, useState } from 'react'
import { bg_URL, qsn_URL, qst_URL } from './apiConfig'
import axios from 'axios'

function App() {

  const options = ['Titles', 'Contributors']
  const genres = ['Genres', 'Comedy', 'Horror']
  const [query, setQuery] = useState('')
  const [titles, setTitles] = useState([])
  const [names, setNames] = useState([])
  const [option, setOption] = useState('Titles')
  const [genre, setGenre] = useState('Genres')

  useEffect(() => {
    const fetchData = async () => {
      console.log('Effect is running with values:', { genre, option, query })
      try {
        if (genre === 'Genres') {
          if (option === 'Titles') {
            const response = await axios.get(qst_URL, { params: { titlePart:  query } })
            setTitles(response.data.titles)
            console.log('titles updated based on query')
          } else {
            const response = await axios.get(qsn_URL, { params: { namePart: query } })
            setNames(response.data.names)
            console.log('names updated based on query')
          }
        } else {
            const response = await axios.get(bg_URL, { params: { qgenre: genre } })
            setTitles(response.data.titles)
            console.log('titles updated based on genre')
        }
      } catch (error) {
        console.error('API request failed:', error.response?.status, error.response?.data)
        throw error
      }
    }

    fetchData()
  }, [genre, option, query])

  return (
    <div className="App">
      <NavBar>
        <Logo/>
        <SearchBar setQuery={setQuery}/>
        <DropDownMenu value={'Titles'} options={options} setOpt={setOption}/>
        <DropDownMenu value={'Genres'} options={genres} setOpt={setGenre}/>
      </NavBar>

      <Main>
          {
            option === 'Titles' || genre!=='Genres'? (
              titles && titles.length > 0 ? (
                titles.map((title) => (
                  <TitleCard key={title.titleID} title={title}/>
              ))) : (
                <p>No titles found... &#9829;</p>
              )
              ) : (
              names && names.length > 0 ? (
                names.map((name) => (
                  <NameCard key={name.nameID} nm={name}/>
              ))) : (
                <p>No contributors found... &#9829;</p>
              )
            )
          }
      </Main>
    </div>
  )
}

export default App