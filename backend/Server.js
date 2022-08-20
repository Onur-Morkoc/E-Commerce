const app = require("./App")
const cloudinary = require("cloudinary");

const dotenv = require("dotenv").config()
const ConnectDatabase = require("./Datebase")

ConnectDatabase()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

const server = app.listen(process.env.PORT, () => {
    console.log(`Giriş Yapıldı. Port: ${process.env.PORT}`)

})

