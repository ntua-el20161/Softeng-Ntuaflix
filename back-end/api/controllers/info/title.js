const TitleBasics = require('../../models/titlebasics')
const TitleAkas = require('../../models/titleakas')
const TitlePrincipals = require('../../models/titleprincipals')
const NameBasics = require('../../models/namebasics')
const TitleRatings = require('../../models/titleratings')
const json2csv = require('json2csv').Parser

exports.GetTitle = async (req, res) => {
    try {
        const result = await TitleBasics.findOne({ tconst: req.params.titleID }).exec()

        if (!result) {
            return res.status(404).json({
                message: 'Title not found'
            })
        }

        const akas = await TitleAkas.find({ titleId: result.tconst }).exec()
        const titleprincipals = await TitlePrincipals.find({ tconst: result.tconst }).select('nconst category').exec()
        const rating = await TitleRatings.findOne({ tconst: result.tconst }).exec()

        const genreList = result.genres.split(',').map(genre => ({ genreTitle: genre.trim() }))

        const akaList = akas ? akas.map(aka => ({
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

        const response = {
            titleID: result.tconst,
            type: result.titleType,
            originalTitle: result.originalTitle,
            titlePoster: result.img_url_asset,
            startYear: result.startYear,
            endYear: result.endYear,
            genres: genreList,
            titleAkas: akaList,
            principals: principalList,
            rating: ratingObject
        }
                
        //format of the response based on the query parameter
        const format = req.query.format;
        if(!format || format === 'json') {
            res.status(200).json(response);
        } else {
            const fields = ['titleID', 'type', 'originalTitle', 'titlePoster', 'startYear', 'endYear', 'genres', 'titleAkas', 'principals', 'rating']
            const json2csvParser = new json2csv({ fields })
            const csv = json2csvParser.parse(response)
            res.header('Content-Type', 'text/csv')
            res.status(200).send(csv)
        }
    } catch (error) {
        console.error('Error:', error)
        res.status(500).json({
            error: 'GetTitle: Internal Server Error'
        })
    }
}