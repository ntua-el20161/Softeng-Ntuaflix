import './App.css'

import axios from 'axios'
import { useEffect, useState, useCallback } from 'react'
import { bg_URL, qsn_URL, qst_URL} from './apiConfig'
import { DropDownMenu } from './components/DropDownMenu'
import { Logo } from './components/Logo'
import { Main } from './components/Main'
import { NameCard } from './components/NameCard'
import { NavBar } from './components/NavBar'
import { SearchBar } from './components/SearchBar'
import { TitleCard } from './components/TitleCard'

function App () {

  const options = ['Titles', 'Contributors']
  const genres = ["Genres", "Comedy","Short","Animation","Western","Horror","Documentary","Drama","Crime","Musical","Family","Action","Fantasy","Sci-Fi","Thriller","Romance","Music","Mystery","Sport","Biography","History","Adult","War","Adventure","News"]
  const [genre, setGenre] = useState('Genres')
  const [query, setQuery] = useState('')
  const [titles, setTitles] = useState([])
  const [names, setNames] = useState([])
  const [option, setOption] = useState('Titles')
  const [searchActive, setSearchActive] = useState(true);

  const fetchData = useCallback(async () => {
    console.log('Effect is running with values:', { genre, option, query, searchActive })
    try {
      if (searchActive) {
        if (option === 'Titles') {
          const response = await axios.get(qst_URL, { params: { titlePart: query } })
          setTitles(response.data)
          console.log('titles updated based on query')
          console.log(response.data)
        } else {
          const response = await axios.get(qsn_URL, { params: { namePart: query } });
          setNames(response.data);
          console.log('names updated based on query');
          console.log(response.data);
        }
      } else {
          const response = await axios.get(bg_URL, { params: { qgenre: genre } })
          setTitles(response.data)
          console.log('titles updated based on genre')
          console.log(response.data)
      }
    } catch (error) {
      console.error('API request failed:', error.response?.status, error.response?.data)
      throw error
    }
  }, [genre, option, query, searchActive])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const handleGenreChange = (selectedGenre) => {
    setGenre(selectedGenre)
    setSearchActive(false) // Set searchActive to false when a genre is selected
  };

  const handleSearchBarChange = (searchQuery) => {
    setQuery(searchQuery)
    setSearchActive(true) // Set searchActive to true when a search is performed
    
  };

  return (
    <div className="App">
      <NavBar>
        <Logo/>
        <span className="search-container">
          <SearchBar setQuery={handleSearchBarChange}/>
          <DropDownMenu value={'Titles'} options={options} setOpt={setOption}/>
        </span>
        <span className="genres-container">
          <DropDownMenu value={'Genres'} options={genres} setOpt={handleGenreChange}/>
        </span>
      </NavBar>

      <Main>
        {option === 'Titles' || genre !== 'Genres' ? (
          titles ? (
            titles.length > 0 ? (
              titles.map((title) => (
                <TitleCard key={title.titleID} title={title}/>
              ))
            ) : (
              <p>Loading... &#9829;</p>
            )
          ) : (
            <p>No title found. &#128546;</p>
        )) : (
          names ? (
            names.length > 0 ? (
              names.map((name) => (
                <NameCard key={name.nameID} nm={name}/>
              ))
            ) : (
              <p>Loading... &#9829;</p>
            )
          ) : (
            <p>No contributor found &#128546;</p>
          ))}
      </Main>
    </div>
  )
}

export default App