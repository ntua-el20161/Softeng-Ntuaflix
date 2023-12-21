const mongoose = require('mongoose')

const nameBasicsModel = mongoose.model('namebasics', new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    nconst: { type: String },
    primaryName: { type: String },
    birthYear: { type: String },
    deathYear: { type: String },
    primaryProfession: { type: String },
    knownForTitles: { type: String },
    img_url_asset: { type: String },
}))

module.exports = nameBasicsModel