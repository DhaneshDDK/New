// Import the required modules
const express = require("express")
const router = express.Router()
const {auth, isStudent}= require('../Middlewares/auth');
const { capturePayment, verifyPayment, sendPaymentSuccessEmail } = require("../Controllers/Payment")


router.post("/capturePayment", auth, isStudent, capturePayment)
router.post("/verifyPayment",auth, isStudent, verifyPayment)
router.post("/sendPaymentSuccessEmail", auth, isStudent, sendPaymentSuccessEmail);

module.exports = router