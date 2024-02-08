const TitlePrincipals = require('../../models/titleprincipals')
const NameBasics = require('../../models/namebasics')
const json2csv = require('json2csv').Parser

exports.GetSearchName = async (req, res) => {
    try {
        let namePart
        if(req.query.namePart) {
            namePart = req.query.namePart
        } else {
            namePart = req.body.namePart
        }

        if (!namePart) {
            return res.status(400).json({
                message: 'Missing namePart in the request body'
            })
        }

        //const qNamePart = '?namePart=${namePart}';

        const regex = new RegExp(namePart)

        const names = await NameBasics.find({ primaryName: regex }).exec()

        if (!names || names.length === 0) {
            return res.status(404).json({
                message: 'No names found'
            })
        }

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

        //format of the response based on the query parameter
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