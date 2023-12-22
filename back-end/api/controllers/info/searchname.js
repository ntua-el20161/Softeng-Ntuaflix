const TitlePrincipals = require('../../models/titleprincipals')
const NameBasics = require('../../models/namebasics')

exports.GetSearchName = async (req, res) => {
    try {
        const namePart = req.body.namePart

        if (!namePart) {
            return res.status(400).json({
                message: 'Missing namePart in the request body'
            })
        }

        const regex = new RegExp(namePart)

        const names = await NameBasics.find({ primaryName: regex }).exec()

        const nameList = names ? await Promise.all (names.map(async(principal) => {

            const nametitles = await TitlePrincipals.find({ nconst: principal.nconst }).exec()

            const nametitleList = nametitles ? nametitles.map(nametitle => ({
                titleID: nametitle.tconst,
                category: nametitle.category
            })) : []

            return {
                nameID: principal.nconst,
                name: principal.primaryName,
                namePoster: principal.img_url_asset,
                birthYr: principal.birthYear,
                deathYr: principal.deathYear,
                profession: principal.primaryProfession,
                nameTitles: nametitleList
            }
        })) : []

        res.status(200).json({
            names: nameList
        })
    } catch (error) {
        console.error('Error:', error)
        res.status(500).json({
            error: 'Internal Server Error'
        })
    }
}