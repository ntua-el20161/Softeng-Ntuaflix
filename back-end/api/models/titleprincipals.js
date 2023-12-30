const mongoose = require('mongoose');

const titlePrincipalsModel = mongoose.model('titleprincipals', new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    titleId: { type: String, ref: 'titlebasics' },
    nameId: { type: String, ref: 'namebasics' },
    ordering: { type: Number },
    category: { type: String },
    job: { type: String },
    characters: { type: String },
    img_url_asset: { type: String },
}))

module.exports = titlePrincipalsModel;