const TitlePrincipals = require('../../models/titleprincipals')
const TitleRatings = require('../../models/titleratings')
const NameBasics = require('../../models/namebasics')
const TitleAkas = require('../../models/titleakas')
const TitleBasics = require('../../models/titlebasics')
const TitleCrew = require('../../models/titlecrew')
const TitleEpisode = require('../../models/titleepisode')

exports.ResetAll = async(req, res) => {
    try {
        await NameBasics.deleteMany({})
        await TitleAkas.deleteMany({})
        await TitleBasics.deleteMany({})
        await TitleCrew.deleteMany({})
        await TitleEpisode.deleteMany({})
        await TitlePrincipals.deleteMany({})
        await TitleRatings.deleteMany({})

        console.log("Reset Successful")
        return res.status(200).json({ message: 'Reset successful' })

    } catch (error) {
        console.error('Error in ResetAll:', error)
        return res.status(500).json({message: 'Error resetting the files', error: error })
    }
}