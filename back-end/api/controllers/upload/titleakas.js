const titleAkas = require('../../models/titleakas')

exports.UploadTitleAkas = async (req, res) => {
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
            titleId: row[0],
            ordering: row[1],
            title: row[2],
            region: row[3],
            language: row[4],
            types: row[5],
            attributes: row[6],
            isOriginalTitle: row[7]
        }))

        const alreadyUploaded = await titleAkas.findOne({ $or: data })
        if(alreadyUploaded) {
            res.status(500).json({ error: 'TitleAkas: File already uploaded' })
        } else {
            await titleAkas.insertMany(data)
            res.status(200).json({ message: 'TitleAkas: File uploaded successfully' })
        }
    } catch (error) {
        console.error('Error uploading the file', error)
        res.status(500).json({ error: 'Error uploading the file' })
    }
}