const catchAsyncErrors = require("../Middleware/catchAsyncErrors")
const User = require("../Models/userModel")
const ErrorHander = require("../Utils/ErrorHander")
const sendToken = require("../Utils/jwtToken")

// Register User
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
    const { name, email, password } = req.body

    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: "örnek resim",
            url: "örnek url"
        }
    })

    sendToken(user, 201, res)
})

// Login User
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body

    if (!email || !password) return next(new ErrorHander("Plase Enter Email And Password", 400))

    const user = await User.findOne({ email }).select("+password")

    if (!user) return next(new ErrorHander("Invalid Email Or Password", 400))

    const isPasswordMatched = await user.comparePassword(password)

    if (!isPasswordMatched) return next(new ErrorHander("Invalid Email Or Password", 400))

    sendToken(user, 201, res)
})

//Logout User
exports.logout = catchAsyncErrors(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: "Logged Out"
    })
})