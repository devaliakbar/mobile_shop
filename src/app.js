const express = require('express')
const path = require('path')
const hbs = require('hbs')

//COOKIE
const cookieParser = require('cookie-parser');

require('./db/mongoose')

//ALL ROUTES
const loginRoute = require("./routers/login")
const serviceRoute = require("./routers/service")

const app = express()

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.use(express.static(publicDirectoryPath))
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.json())

//COOKIE
app.use(cookieParser(process.env.COOKIE_SECRET));

//Setting Routes
app.use(loginRoute)
app.use(serviceRoute)

module.exports = app
