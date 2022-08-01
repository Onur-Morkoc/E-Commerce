const express = require("express")
const app = express()
const cookieParsel = require("cookie-parser")

app.use(express.json())
app.use(cookieParsel())


module.exports = app