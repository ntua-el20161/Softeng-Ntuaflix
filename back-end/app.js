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

// #testing for body with get/post request
// app.post('/ntuaflix_api', (req, res, next) => {
//   console.log(req.body);
//   res.status(201).json({
//     message: 'All good'
//   })
// })

//Handler for the healthcheck endpoint
const healthcheckRoute = require('./api/routes/admin/healthcheck')
app.use('/ntuaflix_api/admin/healthcheck', healthcheckRoute)

//Handler for the database uploads
const uploadRoute = require('./api/routes/admin/uploads')
app.use('/ntuaflix_api/admin/upload', uploadRoute)

//Handler for the database reset
const resetallRoute = require('./api/routes/admin/resetall')
app.use('/ntuaflix_api/admin/resetall', resetallRoute)

//Handler for the title/titleID endpoint
const titleRoute = require('./api/routes/info/title')
app.use('/ntuaflix_api/info/title', titleRoute)

//Handler for the name/nameID endpoint
const nameRoute = require('./api/routes/info/name')
app.use('/ntuaflix_api/info/name', nameRoute)

//======================== Body =============================================

//Handler for the searchname with body
const searchNameRoute = require('./api/routes/info/searchname')
app.use('/ntuaflix_api/info/searchname', searchNameRoute)

//Handler for the searchtitle with body
const searchTitleRoute = require('./api/routes/info/searchtitle')
app.use('/ntuaflix_api/info/searchtitle', searchTitleRoute)

//Handler for the bygenre with body
const byGenreRoute = require('./api/routes/info/bygenre')
app.use('/ntuaflix_api/info/bygenre', byGenreRoute)

//=========================== Query ==========================================

//Handler for the searchname with query
const querySearchNameRoute = require('./api/routes/query/searchname')
app.use('/ntuaflix_api/searchname', querySearchNameRoute)

//Handler for the searchtitle with query
const querySearchTitleRoute = require('./api/routes/query/searchtitle')
app.use('/ntuaflix_api/searchtitle', querySearchTitleRoute)

//Handler for the bygenre with query
const queryByGenreRoute = require('./api/routes/query/bygenre')
app.use('/ntuaflix_api/bygenre', queryByGenreRoute)

//Handler for the cli bygenre with query
const cliByGenreRoute = require('./api/routes/query/clibygenre')
app.use('/ntuaflix_api/clibygenre', cliByGenreRoute)

//Handler for the getallgenres with query
const getAllGenresRoute = require('./api/routes/query/allgenres')
app.use('/ntuaflix_api/getallgenres', getAllGenresRoute)

//Handler for the name/nameID with query
const queryNameRoute = require('./api/routes/query/name')
app.use('/ntuaflix_api/name', queryNameRoute)

//==========================================================================
  
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