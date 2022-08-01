const mongoose = require("mongoose")

const ConnectDatabase = () => {

    mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true})
        .then(m => console.log(`Veritanamına Bağladırdı. ${m.connection.host}`))

}

module.exports = ConnectDatabase