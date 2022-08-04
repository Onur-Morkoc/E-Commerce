const catchAsyncErrors = require("../Middleware/catchAsyncErrors")
const Product = require("../Models/productModels")
const ApiFeatures = require("../Utils/apiFeatures")
const ErrorHander = require("../Utils/ErrorHandler")

// Create Product -- Admin
exports.createProduct = catchAsyncErrors(async (req, res, next) => {

    req.body.user = req.user.id

    const product = await Product.create(req.body)

    res.status(200).json({
        success: true,
        product
    })

})

// All Products
exports.getAllProducts = catchAsyncErrors(async (req, res, next) => {

    const resultPerPage = 5
    const productCount = await Product.countDocuments();

    const apiFeatures = new ApiFeatures(Product.find({}), req.query)
        .search()
        .filter()
        .pagination(resultPerPage)

    const products = await apiFeatures.query

    res.status(200).json({
        success: true,
        products,
        productCount
    })

})

// Get Product Details
exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {

    const productCount = await Product.countDocuments();
    const product = await Product.findById(req.params.id)

    if (!product) return next(new ErrorHander("Product Not Found", 404))

    res.status(200).json({
        success: true,
        product,
        productCount
    })

})

// Update Product -- Admin
exports.UpdateProduct = catchAsyncErrors(async (req, res, next) => {

    let product = await Product.findById(req.params.id)

    if (!product) return next(new ErrorHander("Product Not Found", 404))

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

    if (!product) return next(new ErrorHander("Product Not Found", 404))

    await product.remove()

    res.status(200).json({
        success: true,
        message: "Poduct Delete Successfully"
    })

})

// Create Product Review
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {

    const { rating, comment, productId } = req.body

    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment,
    }

    const product = await Product.findById(productId)

    const isReviewed = product.reviews.find(rev => rev.user.toString() === req.user._id.toString())

    if (isReviewed) {

        product.reviews.forEach(rev => {
            if (rev.user.toString() === req.user._id.toString())
                (rev.rating = rating), (req.comment = comment)
        });

    } else {

        product.reviews.push(review)
        product.numOfReviews = product.reviews.length

    }

    let avg = 0

    product.reviews.forEach(rev => avg += rev.rating)

    product.ratings = avg / product.reviews.length

    await product.save({ validateBeforeSave: false })

    res.status(200).json({
        success: true
    })

})
