const titlePrincipals = require('../../models/titleprincipals')

exports.UploadTitlePrincipals = async (req, res) => {
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
            tconst: row[0],
            ordering: row[1],
            nconst: row[2],
            category: row[3],
            job: row[4],
            characters: row[5],
            img_url_asset: row[6]
        }))

        const alreadyUploaded = await titlePrincipals.findOne({ $or: data })
        if(alreadyUploaded) {
            res.status(500).json({ error: 'TitlePrincipals: File already uploaded' })
        } else {
            await titlePrincipals.insertMany(data)
            res.status(200).json({ message: 'TitlePrincipals: File uploaded successfully' })
        }
    } catch (error) {
        console.error('Error uploading the file', error)
        res.status(500).json({ error: 'Error uploading the file' })
    }
}