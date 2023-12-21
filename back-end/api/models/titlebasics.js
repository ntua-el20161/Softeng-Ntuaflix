const mongoose = require('mongoose')

const titlebasicsModel = mongoose.model('titlebasics', new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    tconst: { type: String },
    titleType: { type: String },
    primaryTitle: { type: String },
    originalTitle: { type: String },
    isAdult: { type: String },
    startYear: { type: String },
    endYear: { type: String },
    runtimeMinutes: { type: String },
    genres: { type: String },
    img_url_asset: { type: String}
}))

module.exports = titlebasicsModel