import { React, useState } from 'react'
import { searchNames } from '../functions/searchNames'
import { searchTitles } from '../functions/searchTitles'

export const SearchBar = ({setResults, option}) => {

    const [query, setQuery] = useState('')

    const handleSearch = async (e) => {
        e.preventDefault()
        if (!query.trim()) {
            setResults({ status: 400 })
        } else {
            try {
                if (option === 'Titles') {
                    await searchTitles({ setResults, query })
                } else {
                    await searchNames({ setResults, query })
                }
            } catch (error) {
                console.error('Error:', error)
            }
        }
    }

    return (
        <>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
            <div className="d-flex flex-grow-1 justify-content-center">
                <form className="d-flex" role="search" onSubmit={handleSearch}>
                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={query} onChange={(e) => setQuery(e.target.value)} />
                    <button type="submit"><i className="fa fa-search"></i></button>
                </form>
            </div>
        </>
    )
}