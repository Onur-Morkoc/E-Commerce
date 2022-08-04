const express = require("express")
const app = express()
const cookieParsel = require("cookie-parser")

app.use(express.json())
app.use(cookieParsel())

const product = require("./Routes/productRoute")
const user = require("./Routes/userRoute")
const order = require("./Routes/orderRoute")

app.use("/api/v1", product)
app.use("/api/v1", user)
app.use("/api/v1", order)

const errorMiddleware = require("./Middleware/Error")

app.use(errorMiddleware)


module.exports = app