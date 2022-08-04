const catchAsyncErrors = require("../Middleware/catchAsyncErrors")
const User = require("../Models/userModel")
const ErrorHander = require("../Utils/ErrorHandler")
const sendToken = require("../Utils/jwtToken")
const sendEmail = require("../Utils/sendEmail")
const crypto = require("crypto")

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

// Logout User
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

// Forgot Password
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email })

    if (!user) return next(new ErrorHander("User Not Found", 404))

    const resetToken = user.getResetPasswordToken()

    await user.save({ validateBeforeSave: false })

    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`

    const message = `Your Password Reset Token Is :- \n\n ${resetPasswordUrl} \n\nIf Your Have Not Requested This Email Then, Please Ignora It.`

    try {
        await sendEmail({
            email: user.email,
            subject: `Ecommerce Password Recovery`,
            message
        })

        res.status(200).json({
            success: true,
            message: `Email Send To ${user.email} SuccessFully`
        })

    } catch (error) {
        user.resetPasswordToken = undefined
        user.resetPasswordExpire = undefined

        await user.save({ validateBeforeSave: false })

        return next(new ErrorHander(error.message, 500))
    }

})

// Reset Password
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {

    const resetPasswordToken = crypto
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex")

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    })

    if (!user) return next(new ErrorHander("Reset Password Token Is Invalid Or Has Been Expired", 400))

    if (req.body.password !== req.body.confirmPassword) return next(new ErrorHander("Password Does Password", 400))

    user.password = req.body.password
    user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined

    await user.save()

    sendToken(user, 200, res)

})

// Get User Details
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {

    const user = await User.findById(req.user.id)

    if (!user) return next(new ErrorHander("User Not Found", 500))

    res.status(200).json({
        success: true,
        user
    })

})

// Update User Password
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {

    const user = await User.findById(req.user.id).select("+password")

    if (!user) return next(new ErrorHander("User Not Found", 500))

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword)

    if (!isPasswordMatched) return next(new ErrorHander("Old Password Is Incorrect", 400))

    if (req.body.newPassword !== req.body.confirmPassword) return next(new ErrorHander("Password Doen Not Match", 400))

    user.password = req.body.newPassword

    await user.save()

    sendToken(user, 201, res)

})