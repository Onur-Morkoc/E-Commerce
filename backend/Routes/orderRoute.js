const express = require("express")
const { newOrder, getSingleOrder, myOrder, getAllOrders, updateOrder, deleteOrder } = require("../Controllers/orderController")
const { isAuthenticatedUser, authorizeRoles } = require("../Middleware/auth")

const router = express.Router()

router.route("/order/new").post(isAuthenticatedUser, newOrder)

router.route("/orders/me").get(isAuthenticatedUser, myOrder)

router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder)

router.route("/admin/orders").get(isAuthenticatedUser,authorizeRoles("Admin"), getAllOrders)

router.route("/admin/order/:id")
.put(isAuthenticatedUser,authorizeRoles("Admin"), updateOrder)
.delete(isAuthenticatedUser,authorizeRoles("Admin"), deleteOrder)

module.exports = router