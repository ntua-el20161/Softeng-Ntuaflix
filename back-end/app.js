const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const db = require('./db')
const app = express()   

app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

/* Give access to other client ports besides 9876 
*/
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', '*')
  if(req.method == 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
    return res.status(200).json({});
  }
  next()
})

const generalRoutes = require('./api/routes/general')
app.use('/general', generalRoutes);

//middleware for the healthcheck endpoint
const healthcheckRoute = require('./api/routes/admin/healthcheck') 
app.use('/admin/healthcheck', healthcheckRoute);

//middleware for the upload_title_basics endpoint
const uploadRoute = require('./api/routes/admin/uploads');
app.use('/admin/upload', uploadRoute);

app.use((req, res, next) => {
  const error = new Error('Endpoint implementation not found');
  error.status = 404;
  next(error); 
})

app.use((error, req, res, next) => {
  res.status(error.status || 500)
  res.json({
    error: {
      message: error.message
    }
  })
})

module.exports = app; 