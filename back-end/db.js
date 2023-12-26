
// Implementation of the connection to the MongoDB database

const mongoose = require('mongoose')

<<<<<<< HEAD
const connectionString = 'mongodb://127.0.0.1:27017/sample_data_softeng';
mongoose.connect(connectionString);
=======
const connectionString = 'mongodb://127.0.0.1:27017/sample_data_softeng'
mongoose.connect(connectionString)
>>>>>>> f39877bb68a7cf2e0dd842bbb684744681de2176

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