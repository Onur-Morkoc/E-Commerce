const express = require("express")
const { newOrder, getSingleOrder, myOrder, getAllOrders } = require("../Controllers/orderController")
const { isAuthenticatedUser, authorizeRoles } = require("../Middleware/auth")

const router = express.Router()

router.route("/order/new").post(isAuthenticatedUser, newOrder)

router.route("/order/me").get(isAuthenticatedUser, myOrder)

router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder)

router.route("/admin/orders").get(isAuthenticatedUser,authorizeRoles("Admin"), getAllOrders)

module.exports = router