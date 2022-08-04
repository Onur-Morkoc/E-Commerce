const catchAsyncErrors = require("../Middleware/catchAsyncErrors")
const Product = require("../Models/productModels")
const Order = require("../Models/orderModel")
const ErrorHander = require("../Utils/ErrorHandler")

// Create Order
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
    const { shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice } = req.body

    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt: Date.now(),
        user: req.user._id
    })

    res.status(201).json({
        success: true,
        order
    })

})

// Single Order
exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {

    const order = await Order.findById(req.params.id).populate("user", "name email")

    if (!order) return next(new ErrorHander(`Order Not Found With This Id: ${req.params.id}`, 500))

    res.status(200).json({
        success: true,
        order
    })

})

// My Orders
exports.myOrder = catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find({ user: req.user.id })

    res.status(200).json({
        success: true,
        orders
    })

})

// All Orders --Admin
exports.getAllOrders = catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find({ })

    let totalAmount = 0

    orders.forEach(order=>totalAmount+=order.totalPrice)

    res.status(200).json({
        success: true,
        totalAmount,
        orders
    })

})
