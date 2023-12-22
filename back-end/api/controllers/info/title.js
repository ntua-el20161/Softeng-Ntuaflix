const TitleBasics = require('../../models/titlebasics')
const TitleAkas = require('../../models/titleakas')
const TitlePrincipals = require('../../models/titleprincipals')
const NameBasics = require('../../models/namebasics')
const TitleRatings = require('../../models/titleratings')

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
            origianlTitle: result.originalTitle,
            titlePoster: result.img_url_asset,
            startYear: result.startYear,
            genres: genreList,
            titleAkas: akaList,
            principals: principalList,
            rating: ratingObject
        }
        res.status(200).json(response)

    } catch (error) {
        console.error('Error:', error)
        res.status(500).json({
            error: 'Internal Server Error'
        })
    }
}