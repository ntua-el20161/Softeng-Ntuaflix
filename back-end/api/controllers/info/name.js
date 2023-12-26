const TitlePrincipals = require('../../models/titleprincipals')
const NameBasics = require('../../models/namebasics')

exports.GetNameInfo = async (req, res) => {
    try {
        const result = await NameBasics.findOne({ nconst: req.params.nameID }).exec()

        if (!result) {
            return res.status(404).json({
                message: 'Name not found'
            })
        }

        const titlePrincipals = TitlePrincipals.find({ nconst: result.nconst }).exec()

        const nameTitleList = titlePrincipals ? (await titlePrincipals).map(nameTitle => ({
            titleID: nameTitle.tconst,
            category: nameTitle.category
        }))
        : ({
            titleID: "",
            category: ""
        });

        const response = {
            nameID: result.nconst,
            name: result.primaryName,
            namePoster: result.img_url_asset,
            birthYr: result.birthYear,
            deathYr: result.deathYear,
            profession: result.primaryProfession,
            nameTitles: nameTitleList,
        }
        res.status(200).json(response)
    } catch (error) {
        console.error('Error:', error)
        res.status(500).json({
            error: 'GetName: Internal Server Error'
        })
    }
}