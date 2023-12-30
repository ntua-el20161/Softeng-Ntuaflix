const mongoose = require('mongoose');
const titleCrew = require('../../models/titlecrew');

exports.UploadTitleCrew = async (req, res) => {
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

        const collection = titleCrew;
    
        /*associate each row generated 
          with each field of the model
        */
        const data = rows.map(row => ({
            tconst: row[0],
            directors: row[1],
            writers: row[2],
        }));
    
        const alreadyUploaded = await titleCrew.findOne({ $or: data });
        if(alreadyUploaded) {
            res.status(500).json({ error: 'TitleCrew: File already uploaded' })
        } else {
            await titleCrew.insertMany(data);
            res.status(200).json({ message: 'TitleCrew: File uploaded successfully' })
        }
    } catch (error) {
        console.error('Error uploading the file', error);
        res.status(500).json({ error: 'Error uploading the file' });
    }
}