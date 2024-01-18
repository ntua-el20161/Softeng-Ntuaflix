const TitleBasics = require('../../models/titlebasics')

exports.GetAllGenres = async (req, res) => {
    try {
        const titles = await TitleBasics.find().exec()

        const allGenres = new Set()
        titles.forEach((title) => {
            if (title.genres) {
                const genresArray = title.genres.split(',').map((genre) => genre.trim())
                genresArray.forEach((genre) => allGenres.add(genre))
            }
        })

        const uniqueGenres = Array.from(allGenres)

        res.status(200).json({ genres: uniqueGenres })
    } catch (error) {
        console.error('Error:', error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}