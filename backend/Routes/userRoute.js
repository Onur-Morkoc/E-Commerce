const express = require("express")
const { registerUser, loginUser, logout, forgotPassword, resetPassword, getUserDetails, updatePassword, updateProfile, getAllUsers, getSingleUser, deleteUser, updateUserRole } = require("../Controllers/userController")
const { isAuthenticatedUser, authorizeRoles } = require("../Middleware/auth")

const router = express.Router()

router.route("/register").post(registerUser)

router.route("/login").post(loginUser)

router.route("/logout").get(logout)

router.route("/password/forgot").post(forgotPassword)

router.route("/password/reset/:token").post(resetPassword)

router.route("/me").get(isAuthenticatedUser, getUserDetails)

router.route("/password/update").put(isAuthenticatedUser, updatePassword)

router.route("/me/update").put(isAuthenticatedUser, updateProfile)

router.route("/admin/users").get(isAuthenticatedUser, authorizeRoles("Admin"), getAllUsers)

router.route("/admin/user/:id")
.get(isAuthenticatedUser, authorizeRoles("Admin"), getSingleUser)
.put(isAuthenticatedUser, authorizeRoles("Admin"), updateUserRole)
.delete(isAuthenticatedUser, authorizeRoles("Admin"), deleteUser)

module.exports = router
