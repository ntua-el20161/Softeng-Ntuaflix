const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const json2csv = require('json2csv').Parser

router.post("/", async (req, res) => {
    const format = req.query.format
    try {
        // Get all collection names
        const collections = await mongoose.connection.db.listCollections().toArray()

        // Drop each collection
        for (const collection of collections) {
            await mongoose.connection.db.dropCollection(collection.name)
        }
        const response = {
            status: "OK"
        }
        if(!format || format === 'json') {
            res.status(200).json(response)
        } else {
            const field = 'status'
            const json2csvParser = new json2csv({ field })
            const csv = json2csvParser.parse(response)
            res.header('Content-Type', 'text/csv')
            res.status(200).send(csv)
        }
    } catch (error) {
        console.error('Error:', error)
        const response = { 
            status: "failed",
            reason: error
        }
        if(!format || format === 'json') {
            res.status(500).json(response)
        } else {
            const field = 'status'
            const json2csvParser = new json2csv({ field })
            const csv = json2csvParser.parse(response)
            res.header('Content-Type', 'text/csv')
            res.status(500).send(csv)
        }
    }
});

module.exports = router
