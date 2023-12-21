const mongoose = require('mongoose')

const titleRatingsModel = mongoose.model('titleratings', new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    tconst: { type: String, ref: 'titlebasics' },
    averageRating: { type: String },
    numVotes: { type: String }
}))

module.exports = titleRatingsModel