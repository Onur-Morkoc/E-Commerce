const express = require("express")
const app = express()
const cookieParsel = require("cookie-parser")

app.use(express.json())
app.use(cookieParsel())

const products = require("./Routes/productRoute")

app.use("/api/v1", products)


const errorMiddleware = require("./Middleware/Error")

app.use(errorMiddleware)


module.exports = app