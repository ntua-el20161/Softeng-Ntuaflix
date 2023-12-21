const nameBasics = require('../../models/namebasics')

exports.UploadNameBasics = async (req, res) => {
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

        //associate each row generated with each field of the model
        const data = rows.map(row => ({
            nconst: row[0],
            primaryName: row[1],
            birthYear: row[2],
            deathYear: row[3],
            primaryProfession: row[4],
            knownForTitles: row[5],
            img_url_asset: row[6]
        }))

        const alreadyUploaded = await nameBasics.findOne({ $or: data })
        if(alreadyUploaded) {
            res.status(500).json({ error: 'NameBasics: File already uploaded' })
        } else {
            await nameBasics.insertMany(data)
            res.status(200).json({ message: 'NameBasics: File uploaded successfully' })
        }
    } catch (error) {
        console.error('Error uploading the file', error)
        res.status(500).json({ error: 'Error uploading the file' })
    }
}