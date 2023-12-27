const TitlePrincipals = require('../../models/titleprincipals')
const TitleRatings = require('../../models/titleratings')
const NameBasics = require('../../models/namebasics')
const TitleAkas = require('../../models/titleakas')
const TitleBasics = require('../../models/titlebasics')

exports.GetTitleByGenre = async (req, res) => {
    try {
        const genre = req.query.qgenre

        if (!genre) {
            return res.status(400).json({
                message: 'Missing qgenre in the request query'
            })
        }

        const titlesByGenre = await TitleBasics.find({ genres: { $regex: new RegExp(`\\b${genre}\\b`) } }).exec()

        const titles = titlesByGenre ? await Promise.all(titlesByGenre.map(async(titleByGenre) => {
            const rating = await TitleRatings.findOne({tconst: titleByGenre.tconst}).exec()
            if(rating) {
                const akas = await TitleAkas.find({ titleId: titleByGenre.tconst }).exec()
                const titleprincipals = await TitlePrincipals.find({ tconst: titleByGenre.tconst }).select('nconst category').exec()

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
                
                return {
                    titleID: titleByGenre.tconst,
                    originalTitle: titleByGenre.originalTitle,
                    titlePoster: titleByGenre.img_url_asset,
                    startYear: titleByGenre.startYear,
                    genres: [{ genreTitle: genre }],
                    titleAkas: akaList,
                    principals: principalList,
                    rating: rating.averageRating
                }
            }
            else {
                return null
            }
        })).then(filteredTitles => filteredTitles.filter(title => title !== null)) : []

        res.status(200).json({
            titles: titles,
        })
    } catch (error) {
        console.error('Error:', error)
        res.status(500).json({
            error: 'Internal Server Error',
        })
    }
}