import { React, useState } from 'react'

export const SearchName = ({setResults}) => {
    const [query, setQuery] = useState('')

    const handleSearch = async (e) => {
        try {
            e.preventDefault()

            const response = await fetch(`http://localhost:9876/ntuaflix_api/searchname?namePart=${query}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            var data
            if(response.status === 400) {
                data = {names: []}
            }

            else if (response.status === 500) {
                throw new Error('Failed to fetch data')
            }
            else {
                data = await response.json()
            }
            setResults(data.names)

        } catch (error) {
            console.error('Error:', error)
        }
    }

    return (
        <>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
            <div className="d-flex flex-grow-1 justify-content-center">
                <form className="d-flex " role="search" onSubmit={handleSearch}>
                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={query} onChange={(e) => setQuery(e.target.value)}/>
                    <button type="submit" onClick={handleSearch}><i class="fa fa-search"></i></button>
                    {/* <button className="btn btn-outline-success" type="submit" onClick={handleSearch}>Search</button> */}
                </form>
            </div>
        </>
    )
}