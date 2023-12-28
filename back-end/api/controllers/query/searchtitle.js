const TitlePrincipals = require('../../models/titleprincipals')
const TitleBasics = require('../../models/titlebasics')
const TitleAkas = require('../../models/titleakas')
const TitleRatings = require('../../models/titleratings')
const NameBasics = require('../../models/namebasics')
const json2csv = require('json2csv').Parser

exports.GetSearchTitle = async (req, res) => {
    try {
        const titlePart = req.query.titlePart

        // if (!titlePart) {
        //     return res.status(400).json({
        //         message: 'Missing titlePart in the query parameters'
        //     })
        // }

        const regex = new RegExp(titlePart)

        const titles = await TitleBasics.find({ originalTitle: regex }).exec()

        const response = titles ? await Promise.all (titles.map(async(title) => {

            const akas = await TitleAkas.find({ titleId: title.tconst }).exec()
            const titleprincipals = await TitlePrincipals.find({ tconst: title.tconst }).select('nconst category').exec()
            const rating = await TitleRatings.findOne({ tconst: title.tconst }).exec()

            const genreList = title.genres.split(',').map(genre => ({ genreTitle: genre.trim() }))

            const titleAkaList = akas ? akas.map(aka => ({
                akaTitle: aka.title,
                regionAbbrev: aka.region
            })) : []

            const principalList = titleprincipals ? await Promise.all (titleprincipals.map(async (titleprincipal) => {
                const principal = await NameBasics.findOne({ nconst: titleprincipal.nconst }).exec()
                return {
                    nameID: principal.nconst,
                    name: principal.primaryName,
                    category: titleprincipal.category
                }
            })) : []

            const ratingObject = rating ? { avRating: rating.averageRating, nVotes: rating.numVotes } : {}

            return {
                titleID: title.tconst,
                type: title.titleType,
                originalTitle: title.originalTitle,
                titlePoster: title.img_url_asset,
                startYear: title.startYear,
                endYear: title.endYear,
                genres: genreList,
                titleAkas: titleAkaList,
                principals: principalList,
                rating: ratingObject
            }
        })) : []

        //format of the response based on the query parameter
        const format = req.query.format;
        if(!format || format === 'json') {
            res.status(200).json(response);
        } else {
            const fields = ['titleID', 'type', 'originalTitle', 'titlePoster', 'startYear', 'genres', 'titleAkas', 'principals', 'rating']
            const json2csvParser = new json2csv({ fields })
            const csv = json2csvParser.parse(response)
            res.header('Content-Type', 'text/csv')
            res.status(200).send(csv)
        }
    } catch (error) {
        console.error('Error:', error)
        res.status(500).json({
            error: 'Internal Server Error'
        })
    }
}