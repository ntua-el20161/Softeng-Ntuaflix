const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const app = express()

app.use(morgan('dev'))
app.use('/uploads', express.static('uploads'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//Give access to other client ports besides 9876
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', '*')
  if(req.method == 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
    return res.status(200).json({})
  }
  next()
})

//Handler for the healthcheck endpoint
const healthcheckRoute = require('./api/routes/admin/healthcheck')
app.use('/ntuaflix_api/admin/healthcheck', healthcheckRoute)

//Handler for the database uploads
const uploadRoute = require('./api/routes/admin/uploads')
app.use('/ntuaflix_api/admin/upload', uploadRoute)

//Handler for the database rest
const resetallRoute = require('./api/routes/admin/resetall')
app.use('/ntuaflix_api/admin/resetall', resetallRoute)

//Handler for the title/titleID endpoint
const titleRoute = require('./api/routes/info/title')
app.use('/ntuaflix_api/info/title', titleRoute)

//Handler for the name/nameID endpoint
const nameRoute = require('./api/routes/info/name')
app.use('/ntuaflix_api/info/name', nameRoute)

//Handler for the searchtitle endpoint
const searchTitleRoute = require('./api/routes/info/searchtitle')
app.use('/ntuaflix_api/searchtitle', searchTitleRoute)

/*app.use('/ntuaflix_api', (req, res) => {
//Handler for the searchname with body
const searchNameRoute = require('./api/routes/info/searchname')
app.use('/ntuaflix_api/info/searchname', searchNameRoute)

//Handler for the searchname with query
const qsearchNameRoute = require('./api/routes/info/qsearchname')
app.use('/ntuaflix_api/searchname', qsearchNameRoute)

//Handler for the searchname with body
const searchTitleRoute = require('./api/routes/info/searchtitle')
app.use('/ntuaflix_api/info/searchtitle', searchTitleRoute)

//Handler for the searchname with query
const qsearchTitleRoute = require('./api/routes/info/qsearchtitle')
app.use('/ntuaflix_api/searchtitle', qsearchTitleRoute)

//Handler for the bygenre
const byGenreRoute = require('./api/routes/info/bygenre')
app.use('/ntuaflix_api/info/bygenre', byGenreRoute)

app.use('/ntuaflix_api', (req, res) => {
  res.status(200).json({
    ntuaflix_api: "Welcome to the ntuaflix_api!"
  })
})*/

app.use((req, res, next) => {
  const error = new Error('Endpoint implementation not found')
  error.status = 404
  next(error)
})

app.use((error, req, res, next) => {
  res.status(error.status || 500)
  res.json({
    error: {
      message: error.message
    }
  })
})

module.exports = app