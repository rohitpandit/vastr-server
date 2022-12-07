const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const logger = require('./lib/logger')
require('./db')
require('dotenv').config()

const routes = require('./routes')

const app = express()

app.use(cors())
app.use(morgan('combined', {stream: logger.stream }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


routes(app);

app.get('/', (req, res) => {
  res.send('server is alive')
})


module.exports = app