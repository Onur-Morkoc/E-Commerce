const express = require("express")
const { getAllProducts, createProduct, UpdateProduct, deleteProduct, getProductDetails, createProductReview, getProductReviews, deleteReview } = require("../Controllers/productController")
const { isAuthenticatedUser, authorizeRoles } = require("../Middleware/auth")

const router = express.Router()

router.route("/products").get(getAllProducts)

router.route("/admin/product/new").post(isAuthenticatedUser, authorizeRoles("Admin"), createProduct)

router.route("/admin/product/:id")
    .put(isAuthenticatedUser, authorizeRoles("Admin"), UpdateProduct)
    .delete(isAuthenticatedUser, authorizeRoles("Admin"), deleteProduct)

router.route("/product/:id").get(getProductDetails)

router.route("/review").put(isAuthenticatedUser,createProductReview)

router.route("/reviews")
.get(getProductReviews)
.delete(isAuthenticatedUser, deleteReview)

module.exports = router
