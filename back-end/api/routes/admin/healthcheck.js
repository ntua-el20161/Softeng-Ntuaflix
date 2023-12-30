// [GET]/admin/healthcheck endpoint

const express = require('express')
const { db, connectionString } = require('../../../db')
const router = express.Router()
const json2csv = require('json2csv').Parser

router.get('/', (req, res, next) => {
    let connectionStatus
    let status;
    if(db.readyState === 1) {
        connectionStatus = {
            status: 'OK',
            dataconnection: connectionString
        }
        status = 200
    } else {
        connectionStatus = {
            status: 'failed',
            dataconnection: connectionString
        }
        status = 500
    }
    const format = req.query.format;
    if(!format || format === 'json') {
        res.status(status).json(connectionStatus)
    } else {
        const fields = ['status', 'dataconnection']
        const json2csvParser = new json2csv({ fields })
        const csv = json2csvParser.parse(connectionStatus)
        res.header('Content-Type', 'text/csv')
        res.status(status).send(csv)
    }
})

module.exports = router