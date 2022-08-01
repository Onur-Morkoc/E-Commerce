const catchAsyncErrors = require("../Middleware/catchAsyncErrors")
const Product = require("../Models/productModels")
const ErrorHander = require("../Utils/ErrorHander")

// Create Product -- Admin
exports.createProduct = catchAsyncErrors(async (req, res, next) => {

    const product = await Product.create(req.body)

    res.status(200).json({
        success: true,
        product
    })

})

// All Products
exports.getAllProducts = catchAsyncErrors(async (req, res, next) => {

    const products = await Product.find()

    res.status(200).json({
        success: true,
        products
    })

})

// Get Product Details
exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {

    const product = await Product.findById(req.params.id)

    if (!product) return next(new ErrorHander("Product Not Found", 500))

    res.status(200).json({
        success: true,
        product
    })

})

// Update Product -- Admin
exports.UpdateProduct = catchAsyncErrors(async (req, res, next) => {

    let product = await Product.findById(req.params.id)

    if (!product) return next(new ErrorHander("Product Not Found", 500))

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })

    res.status(200).json({
        success: true,
        product
    })

})

// Delete Product -- Admin

exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {

    const product = await Product.findById(req.params.id)

    if (!product) return next(new ErrorHander("Product Not Found", 500))

    await product.remove()

    res.status(200).json({
        success: true,
        message: "Poduct Delete Successfully"
    })


})