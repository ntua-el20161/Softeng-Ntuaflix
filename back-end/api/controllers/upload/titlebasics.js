const titleBasics = require('../../models/titlebasics')
const json2csv = require('json2csv').Parser

exports.UploadTitleBasics = async (req, res) => {
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
            titleType: row[1],
            primaryTitle: row[2],
            originalTitle: row[3],
            isAdult: row[4],
            startYear: row[5],
            endYear: row[6],
            runtimeMinutes: row[7],
            genres: row[8],
            img_url_asset: row[9],
        }))
    
        let response;
        let status;
        const alreadyUploaded = await titleBasics.findOne({ $or: data })
        if(alreadyUploaded) {   
            response = {
                titleBasics: 'File already uploaded'
            }
            status = 500
        } else {
            await titleBasics.insertMany(data)
            response = {
                titleBasics: 'File uploaded successfully'
            }
            status = 200
        }
        const format = req.query.format
        if(!format || format === 'json') {
            res.status(status).json(response)
        } else {            
            const field = 'titleBasics'
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