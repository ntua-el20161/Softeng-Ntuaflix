import {SearchResults} from './SearchResults'
import '../styles/SearchResultsList.css'

export const SearchResultsList = ({results, option}) => {

    return (
        (results.status === 200) &&
        <div className="results-list">
            {
                option === 'Titles' ?
                results.titles &&
                results.titles.map((title) => {
                    return (
                        <SearchResults key={title.titleID} result={title} option={option}/>
                    )
                }):
                results.names &&
                results.names.map((name) => {
                    return (
                        <SearchResults key={name.nameID} result={name} option={option}/>
                    )
                })
            }
        </div>
    )
}