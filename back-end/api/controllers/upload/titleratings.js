<<<<<<< HEAD
const mongoose = require('mongoose');
const titlePrincipals = require('../../models/titleprincipals');

exports.UploadTitleRatings = async (req, res) => {
    try {
        
        //check if there is a file selected for upload
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }
    
        //Access the TSV data from the buffer
        const tsvDataBuffer = req.file.buffer;
    
        //A huge string containing the contents of the file
        const tsvDataString = tsvDataBuffer.toString('utf8');
    
        //Parse the String accordingly
        const rows = tsvDataString.split('\n').map(row => row.split('\t'));

        const headers = rows.shift();

        const collection = titleRatings;
    
        /*associate each row generated 
          with each field of the model
        */
        const data = rows.map(row => ({
            titleId: row[0],
            averageRating: row[1],
            numVotes: row[2],
        }));
    
        const alreadyUploaded = await titleRatings.findOne({ $or: data });
        if(alreadyUploaded) {
            res.status(500).json({ error: 'TitleRatings: File already uploaded' })
        } else {
            await titleRatings.insertMany(data);
            res.status(200).json({ message: 'TitleRatings: File uploaded successfully' })
        }
    } catch (error) {
        console.error('Error uploading the file', error);
        res.status(500).json({ error: 'Error uploading the file' });
=======
const titleRatings = require('../../models/titleratings')
const json2csv = require('json2csv').Parser

exports.UploadTitleRatings = async (req, res) => {
    try {

        //check if there is a file selected for upload
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' })
        }

        //Access the TSV data from the buffer
        const tsvDataBuffer = req.file.buffer
    
        //A huge string containing the contents of the file
        const tsvDataString = tsvDataBuffer.toString('utf8')
    
        //Parse the String accordingly
        const rows = tsvDataString.split('\n').map(row => row.split('\t'))

        //exclude headers from insertion
        const headers = rows.shift()
        
        //associate each row generated with each field of the model
        const data = rows.map(row => ({
            tconst: row[0],
            averageRating: row[1],
            numVotes: row[2]
        }))

        let response;
        let status;
        const alreadyUploaded = await titleRatings.findOne({ $or: data })
        if(alreadyUploaded) {   
            response = {
                titleRatings: 'File already uploaded'
            }
            status = 500
        } else {
            await titleRatings.insertMany(data)
            response = {
                titleRatings: 'File uploaded successfully'
            }
            status = 200
        }
        const format = req.query.format
        if(!format || format === 'json') {
            res.status(status).json(response)
        } else {            
            const field = 'titleRatings'
            const json2csvParser = new json2csv({ field })
            const csv = json2csvParser.parse(response)
            res.header('Content-Type', 'text/csv')

            res.status(status).send(csv)
        }
    } catch (error) {
        console.error('Error uploading the file', error)
        res.status(500).json({ error: 'Error uploading the file' })
>>>>>>> b8c863e6dee5a1a8da2fe5d40fbe7a05115ed66a
    }
}