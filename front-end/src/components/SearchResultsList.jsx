import React from 'react'
import {SearchResult} from './SearchResult'
import '../styles/SearchResultsList.css'

export const SearchResultsList = ({results}) => {
    return (
        results &&
        <div className="results-list">
            {
                results.map((result) => {
                    return (
                        <SearchResult result={result}/>
                    )
                })
            }
        </div>
    )
}