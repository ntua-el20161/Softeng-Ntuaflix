// [GET]/admin/healthcheck endpoinτ

const express = require('express')
const { db, connectionString } = require('../../../db')
const mongoose = require('mongoose')
const router = express.Router()

router.get('/', (req, res, next) => {
    let connectionStatus

    if(db.readyState === 1) {
        connectionStatus = {
            status: 'OK',
            dataconnection: connectionString
        }
    } else {
        connectionStatus = {
            status: 'failed',
            dataconnection: connectionString
        }
    }
    res.status(200).json(connectionStatus)
})

module.exports = router