const mongoose = require('mongoose')

const titlePrincipalsModel = mongoose.model('titleprincipals', new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    tconst: { type: String, ref: 'titlebasics' },
    ordering: { type: String },
    nconst: { type: String, ref: 'namebasics' },
    category: { type: String },
    job: { type: String },
    characters: { type: String },
    img_url_asset: { type: String },
}))

module.exports = titlePrincipalsModel