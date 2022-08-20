const express = require("express")
const app = express()
const cookieParsel = require("cookie-parser")
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

app.use(express.json())
app.use(cookieParsel())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

const product = require("./Routes/productRoute")
const user = require("./Routes/userRoute")
const order = require("./Routes/orderRoute")
const payment = require("./Routes/paymentRoute")

app.use("/api/v1", product)
app.use("/api/v1", user)
app.use("/api/v1", order)
app.use("/api/v1", payment);

const errorMiddleware = require("./Middleware/Error")

//app.use(errorMiddleware)


module.exports = app