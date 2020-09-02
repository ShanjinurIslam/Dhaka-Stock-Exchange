const express = require('express')
const http = require('http')
const bodyParser = require('body-parser')
const apiRouter = require('./routers/api')

require('./db')

app = express()

server = http.createServer(app)

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


app.use('/api', apiRouter)

port = process.env.PORT || 3000

server.listen(port, () => {
    console.log("Connected to server successfully")
})