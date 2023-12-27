const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

router.post("/", async (req, res) => {
    try {
        // Add any necessary validation for the request body here
        // (e.g., authentication or specific request payload checks)

        // Get all collection names
        const collections = await mongoose.connection.db.listCollections().toArray();

        // Drop each collection
        for (const collection of collections) {
            await mongoose.connection.db.dropCollection(collection.name);
        }

        res.status(200).json({ status: "OK" });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            status: "failed",
            reason: error
        });
    }
});

module.exports = router
