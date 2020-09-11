const express = require('express')
const http = require('http')
const bodyParser = require('body-parser')
const path = require('path')

const apiRouter = require('./routers/api')
const publicRouter = require('./routers/public')

const publicPath = path.join(__dirname + '/public')
const viewsPath = path.join(__dirname + '/views')

require('./db')

app = express()

app.use(express.static(publicPath))

app.set('views', viewsPath);
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());

server = http.createServer(app)

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


app.use('/api', apiRouter)
app.use('/', publicRouter)

port = process.env.PORT || 3000

server.listen(port, () => {
    console.log("Connected to server successfully")
})