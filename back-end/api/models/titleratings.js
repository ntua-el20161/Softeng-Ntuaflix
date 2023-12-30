const mongoose = require('mongoose');

const titleRatingsModel = mongoose.model('titleRatings', new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    titleId: { type: String, ref: 'titlebasics' },
    averageRating: { type: Number },
    numVotes: { type: Number },
}))

module.exports = titleRatingsModel;