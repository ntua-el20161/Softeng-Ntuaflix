const TitlePrincipals = require('../../models/titleprincipals')
const NameBasics = require('../../models/namebasics')
const json2csv = require('json2csv').Parser

exports.GetSearchName = async (req, res) => {
    try {
        const namePart = req.query.namePart
        // console.log(namePart)
        // if (!namePart) {
        //     return res.status(400).json({
        //         message: 'Missing namePart in the query parameters'
        //     })
        // }

        const regex = new RegExp(namePart)
        // console.log(regex)

        const names = await NameBasics.find({ primaryName: regex }).exec()
        // console.log(names)
        
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

        const format = req.query.format
        if(!format || format === 'json') {
            res.status(200).json(nameList)
        } else {
            const fields = ['nameID', 'name', 'namePoster', 'birthYr', 'deathYr', 'profession', 'nameTitles']
            const json2csvParser = new json2csv({ fields })
            const csv = json2csvParser.parse(nameList)
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