import '../styles/SearchBar.css'
import {useState} from 'react'

export const SearchBar = ({ setQuery }) => {
    const [searchValue, setSearchValue] = useState('')

    const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        console.log('you pressed enter')
        setQuery(searchValue)
        console.log(`query is: ${searchValue}`)
      }
    }

    return (
      <input
      className="search-bar"
      type="text"
      placeholder="Search"
      value={searchValue}
      onSubmit={()=>setQuery(searchValue)}
      onChange={(e) => setSearchValue(e.target.value)}
      onKeyDown={handleKeyPress}
      />
    )
}