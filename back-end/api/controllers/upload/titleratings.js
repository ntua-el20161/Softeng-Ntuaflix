const titleRatings = require('../../models/titleratings')

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

        const alreadyUploaded = await titleRatings.findOne({ $or: data })
        if(alreadyUploaded) {
            res.status(500).json({ error: 'TitleRatings: File already uploaded' })
        } else {
            await titleRatings.insertMany(data)
            res.status(200).json({ message: 'TitleRatings: File uploaded successfully' })
        }
    } catch (error) {
        console.error('Error uploading the file', error)
        res.status(500).json({ error: 'Error uploading the file' })
    }
}