const express = require("express")
const router = express.Router()
const { auth , isInstructor} = require("../Middlewares/auth")
const {
  deleteAccount,
  updateProfile,
  getAllUserDetails,
  updateDisplayPicture,
  getEnrolledCourses,
  deleteDisplayPicture,
  instructorDashboard
} = require("../Controllers/Profile")

// ********************************************************************************************************
//                                      Profile routes
// ********************************************************************************************************
// Delet User Account
router.delete("/deleteProfile", auth, deleteAccount)
router.put("/updateProfile", auth, updateProfile)
router.get("/getUserDetails", auth, getAllUserDetails)
// Get Enrolled Courses
router.get("/getEnrolledCourses", auth, getEnrolledCourses)
router.put("/updateDisplayPicture", auth, updateDisplayPicture)
router.put("/deleteDisplayPicture", auth, deleteDisplayPicture);
router.get("/instructorDashboard", auth, isInstructor, instructorDashboard)

module.exports = router