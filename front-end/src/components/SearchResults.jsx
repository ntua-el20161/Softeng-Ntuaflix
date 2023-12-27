import '../styles/SearchResults.css'

export const SearchResults = ({result, option}) => {
    return (
        <>
        <div className="search-result">
        {
            option === 'Titles' ?
            result.originalTitle :
            result.name
        }
        <button className="view-info" type="button" style={{margin: "0 0 0 100px"}}>ViewInfo</button>
        </div>
        </>
        
    )
}