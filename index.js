const express = require('express')
const bodyParser = require("body-parser");
require('dotenv').config()

const app = express()
const mainRoute = require('./router/index')
const authRouter = require('./router/auth')

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(mainRoute)
app.use(authRouter)
app.listen(process.env.PORT)