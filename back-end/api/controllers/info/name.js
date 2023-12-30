const TitlePrincipals = require('../../models/titleprincipals')
const NameBasics = require('../../models/namebasics')
const json2csv = require('json2csv').Parser

exports.GetName = async (req, res) => {
    try {
        const result = await NameBasics.findOne({ nconst: req.params.nameID }).exec()

        if (!result) {
            return res.status(404).json({
                message: 'Name not found'
            })
        }

        const titlePrincipals = await TitlePrincipals.find({ nconst: result.nconst }).exec()

        const nameTitleList = titlePrincipals ? (titlePrincipals).map(nameTitle => ({
            titleID: nameTitle.tconst,
            category: nameTitle.category
        })) : []

        const response = {
            nameID: result.nconst,
            name: result.primaryName,
            namePoster: result.img_url_asset,
            birthYr: result.birthYear,
            deathYr: result.deathYear,
            profession: result.primaryProfession,
            nameTitles: nameTitleList,
        }
        //format of the response based on the query parameter
        const format = req.query.format;
        if(!format || format === 'json') {
            res.status(200).json(response);
        } else {
            const fields = ['nameID', 'name', 'namePoster', 'birthYr', 'deathYr', 'profession', 'nameTitles']
            const json2csvParser = new json2csv({ fields })
            const csv = json2csvParser.parse(response)
            res.header('Content-Type', 'text/csv')
            res.status(200).send(csv)
        }
    } catch (error) {
        console.error('Error:', error)
        res.status(500).json({
            error: 'GetName: Internal Server Error'
        })
    }
}