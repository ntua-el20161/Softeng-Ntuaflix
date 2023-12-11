const mongoose = require('mongoose');

/*the model for the title_basics file
  Fields with rows that contain '/N' 
  have to be of type String
*/
const generalSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    price: { type: Number, required: true },
    productImage: { type: String, required: true }
})

module.exports = mongoose.model('General', generalSchema)   