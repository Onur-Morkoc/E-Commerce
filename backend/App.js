const express = require("express")
const app = express()
const cookieParsel = require("cookie-parser")

app.use(express.json())
app.use(cookieParsel())

const product = require("./Routes/productRoute")
const user = require("./Routes/userRoute")

app.use("/api/v1", product)

app.use("/api/v1", user)

const errorMiddleware = require("./Middleware/Error")

app.use(errorMiddleware)


module.exports = app