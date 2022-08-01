const app = require("./App")

const dotenv = require("dotenv").config()
const ConnectDatabase = require("./Datebase")

ConnectDatabase()

const server = app.listen(process.env.PORT, () => {
    console.log(`Giriş Yapıldı. Port: ${process.env.PORT}`)

})

