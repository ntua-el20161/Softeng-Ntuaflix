
// Implementation of the connection to the MongoDB database

const mongoose = require('mongoose')

const connectionString = 'mongodb://127.0.0.1:27017/sample_data_softeng';
mongoose.connect(connectionString);

const db = mongoose.connection

db.on('error', (err) => {
    console.error('MongoDB connection error:', err)
})
  
db.once('open', () => {
    console.log('Connected to MongoDB')
})

module.exports = {
    db,
    connectionString
}