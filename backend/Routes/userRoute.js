const express = require("express")
const { registerUser, loginUser, logout, forgotPassword, resetPassword } = require("../Controllers/userController")

const router = express.Router()

router.route("/register").post(registerUser)

router.route("/login").post(loginUser)

router.route("/logout").post(logout)

router.route("/password/forgot").post(forgotPassword)

router.route("/password/reset/:token").post(resetPassword)



module.exports = router
