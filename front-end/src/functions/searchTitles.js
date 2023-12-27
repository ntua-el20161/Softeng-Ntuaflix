
export const searchTitles = async ({setResults, query}) => {
    try {
        const response = await fetch(`http://localhost:9876/ntuaflix_api/searchtitle?titlePart=${encodeURIComponent(query)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if(response.status === 500) {
            throw new Error('Failed to fetch data')
        }

        const data = await response.json()
        setResults({titles: data.titles, status: 200})
    } catch (error) {
        console.error('Error:', error)
    }
}