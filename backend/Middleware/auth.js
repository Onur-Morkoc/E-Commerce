const catchAsyncErrors = require("../Middleware/catchAsyncErrors")
const ErrorHander = require("../Utils/ErrorHander")
const jwt = require("jsonwebtoken")
const User = require("../Models/userModel")

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
    const { token } = req.cookies

    if (!token) return next(new ErrorHander("Please Login To Access This Resource", 401))

    const decodedData = jwt.verify(token, process.env.JWT_SECRET)

    req.user = await User.findById(decodedData.id)

    next()

})

exports.authorizeRoles = (...roles) => {
    return async (req, res, next) => {

        if(!roles.includes(req.user.role)) return next(new ErrorHander(`Role: ${req.user.role} Is Not Allowed To Access This Resouce`, 403))

        next()
    }
}