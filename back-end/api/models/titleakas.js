const mongoose = require('mongoose');

const titleAkasModel = mongoose.model('titleakas', new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    titleId: { type: String },
    ordering: { type: Number },
    title: { type: String },
    region: { type: String },
    language: { type: String },
    types: { type: String },
    attributes: { type: String },
    isOriginalTitle: { type: Boolean },
}))

module.exports = titleAkasModel;