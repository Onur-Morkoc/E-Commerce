const express = require("express")
const { getAllProducts, createProduct, UpdateProduct, deleteProduct, getProductDetails } = require("../Controllers/productController")

const router = express.Router()

router.route("/products").get(getAllProducts)

router.route("/product/new").post(createProduct)

router.route("/product/:id").put(UpdateProduct).delete(deleteProduct).get(getProductDetails)

module.exports = router
