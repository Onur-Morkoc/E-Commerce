const express = require("express")
const { getAllProducts, createProduct, UpdateProduct, deleteProduct, getProductDetails } = require("../Controllers/productController")
const { isAuthenticatedUser, authorizeRoles } = require("../Middleware/auth")

const router = express.Router()

router.route("/products").get(isAuthenticatedUser, authorizeRoles("Admin"), getAllProducts)

router.route("/product/new").post(isAuthenticatedUser, authorizeRoles("Admin"), createProduct)

router.route("/product/:id")
    .put(isAuthenticatedUser, authorizeRoles("Admin"), UpdateProduct)
    .delete(isAuthenticatedUser, authorizeRoles("Admin"), deleteProduct)
    .get(getProductDetails)

module.exports = router
