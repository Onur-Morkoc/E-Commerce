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

// All Orders -- Admin
exports.getAllOrders = catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find({})

    let totalAmount = 0

    orders.forEach(order => totalAmount += order.totalPrice)

    res.status(200).json({
        success: true,
        totalAmount,
        orders
    })

})

// Update Order Status -- Admin
exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id)

    if (!order) return next(new ErrorHander(`Order Not Found With This Id: ${req.params.id}`, 500))

    if (order.orderStatus == "Delivered") return next(new ErrorHander("You Have Already Delivered This Order", 400))

    order.orderItems.forEach(async o => await updateStock(o.product, o.quantity))

    order.orderStatus= req.body.status

    if (req.body.status == "Delivered") order.deliveredAt = Date.now()

    await order.save({ validateBeforeSave: false })

    res.status(200).json({
        success: true
    })

})

async function updateStock(id, quantity) {
    const product = await Product.findById(id)

    product.stock -= quantity

    await product.save({ validateBeforeSave: false })

}

// Delete Order -- Admin
exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id)

    if (!order) return next(new ErrorHander(`Order Not Found With This Id: ${req.params.id}`, 500))

    await order.remove()

    res.status(200).json({
        success: true
    })

})