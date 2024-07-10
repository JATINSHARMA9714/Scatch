require('dotenv').config();
const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const path = require('path')
const db = require('./config/mongoose-connection')

const adminRoutes = require('./routes/adminRoutes')
const homeRoutes = require('./routes/homeRoutes')
const loginRoutes = require('./routes/loginRoutes')

app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({ extended:true }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(cookieParser())

app.use('/',loginRoutes)
app.use('/admin',adminRoutes)
app.use('/home',homeRoutes)

app.listen(process.env.PORT)