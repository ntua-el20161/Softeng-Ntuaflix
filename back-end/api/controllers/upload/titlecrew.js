const titleCrew = require('../../models/titlecrew')
const json2csv = require('json2csv').Parser

exports.UploadTitleCrew = async (req, res) => {
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
            directors: row[1],
            writers: row[2],
        }))
    
        let response;
        let status;
        const alreadyUploaded = await titleCrew.findOne({ $or: data })
        if(alreadyUploaded) {   
            response = {
                titleCrew: 'File already uploaded'
            }
            status = 500
        } else {
            await titleCrew.insertMany(data)
            response = {
                titleCrew: 'File uploaded successfully'
            }
            status = 200
        }
        const format = req.query.format
        if(!format || format === 'json') {
            res.status(status).json(response)
        } else {            
            const field = 'titleCrew'
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