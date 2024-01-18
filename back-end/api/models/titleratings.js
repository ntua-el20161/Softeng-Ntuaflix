<<<<<<< HEAD
const mongoose = require('mongoose');

const titleRatingsModel = mongoose.model('titleRatings', new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    titleId: { type: String, ref: 'titlebasics' },
    averageRating: { type: Number },
    numVotes: { type: Number },
}))

module.exports = titleRatingsModel;
=======
const mongoose = require('mongoose')

const titleRatingsModel = mongoose.model('titleratings', new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    tconst: { type: String, ref: 'titlebasics' },
    averageRating: { type: String },
    numVotes: { type: String }
}))

module.exports = titleRatingsModel
>>>>>>> b8c863e6dee5a1a8da2fe5d40fbe7a05115ed66a
