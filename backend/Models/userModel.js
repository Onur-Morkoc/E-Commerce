const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const crypto = require("crypto")


const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter Your Name"],
        maxLength: [32, "Name Cannot Exceed 32 Characters"],
        minLength: [3, "Name Should Have More  3 Characters"]
    },
    email: {
        type: String,
        required: [true, "Please Enter Your Email"],
        unique: true,
        validate: [validator.isEmail, "Please Enter A Valid Emaild"]
    },
    password: {
        type: String,
        required: [true, "Please Enter Your Passaword"],
        minLength: [8, "Passowrd Should Be Greater Than 8 Characters"],
        select: false
    },
    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    role: {
        type: String,
        default: "User"
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
})

// Bcrypt hash
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) next()

    this.password = await bcrypt.hash(this.password, 10)
})

// JWT Token
userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    })
}

// Compare Password
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

// Password Reset Token
userSchema.methods.getResetPasswordToken = function () {

    const resetToken = crypto.randomBytes(20).toString("hex")

    this.resetPasswordToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex")

    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000

    return resetToken

}

module.exports = mongoose.model("User", userSchema)

