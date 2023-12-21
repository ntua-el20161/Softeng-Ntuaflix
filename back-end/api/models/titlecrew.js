const mongoose = require('mongoose')

const titleCrewModel = mongoose.model('titlecrew', new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    tconst: { type: String },
    directors: { type: String },
    writers: { type: String },
}))

module.exports = titleCrewModel