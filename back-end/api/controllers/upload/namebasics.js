const nameBasics = require('../../models/namebasics')
const json2csv = require('json2csv').Parser

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
        
        //exclude headers from insertion
        const headers = rows.shift()

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

        let response;
        let status;
        const alreadyUploaded = await nameBasics.findOne({ $or: data })
        if(alreadyUploaded) {
            response = {
                nameBasics: 'File already uploaded'
            }
            status = 500
            //res.status(200).send(message, File, uploaded, succesfully)
            //res.status(500).json({ error: 'NameBasics: File already uploaded' })
        } else {
            await nameBasics.insertMany(data)
            response = {
                nameBasics: 'File uploaded successfully'
            }
            status = 200
        }
        const format = req.query.format
        if(!format || format === 'json') {
            res.status(status).json(response)
        } else {
            const field = 'nameBasics'
            const json2csvParser = new json2csv({ field })
            const csv = json2csvParser.parse(response)
            res.header('Content-Type', 'text/csv')
            res.status(status).send(csv)
        }
    } catch (error) {
        console.error('Error uploading the file', error)
        res.status(500).json({ error: 'Error uploading the file' })
    }
}