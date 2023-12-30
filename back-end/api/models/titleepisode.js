const mongoose = require('mongoose')

const titleEpisodeModel = mongoose.model('titleepisode', new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    tconst: { type: String },
    parentTconst: { type: String },
    seasonNumber: { type: String },
    episodeNumber: { type: String }
}))

module.exports = titleEpisodeModel